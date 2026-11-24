#!/usr/bin/env python3
"""Generate verified raster derivatives from the canonical SG logo master."""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter
import shutil

SRC = Path("/home/sebastiangarcia/.gemini/antigravity/brain/14770c17-8d9f-477c-8814-2fd0aae075e5/.user_uploaded/media_1795457010107_25d264f2.jpg")
ROOT = Path("/home/sebastiangarcia/planmaestro-ecosystem/packages/security-portfolio")
BRAND_DIR = ROOT / "public" / "brand"
BRAND_DIR.mkdir(parents=True, exist_ok=True)

# 1. Preserve canonical master untouched
master_dst = BRAND_DIR / "sg-logo-master.jpg"
shutil.copy2(SRC, master_dst)

img = Image.open(master_dst).convert("RGBA")
w, h = img.size
assert (w, h) == (1024, 1024), f"Unexpected source dimensions: {(w, h)}"

# Detect luminous outer circumference along cardinal lines so we preserve full glow
gray = img.convert("L")
cx, cy = w // 2, h // 2
outer_radii = []
for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
    last_lit = 0
    for r in range(380, 512):
        px = gray.getpixel((cx + dx * r, cy + dy * r))
        if px > 28:
            last_lit = r
    if last_lit:
        outer_radii.append(last_lit)

ring_outer_r = max(outer_radii) if outer_radii else 496
pad_r = min(508, ring_outer_r + 6)
print(f"Detected outer ring radius: {outer_radii}, using mask radius: {pad_r}")

# Build smooth anti-aliased circular mask at 2x supersampling
mask = Image.new("L", (w * 2, h * 2), 0)
draw = ImageDraw.Draw(mask)
m_pad = (w // 2 - pad_r) * 2
draw.ellipse((m_pad, m_pad, w * 2 - m_pad, h * 2 - m_pad), fill=255)
mask = mask.resize((w, h), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(radius=1.2))

# Transparent circular web version (512x512)
web_rgba = img.copy()
web_rgba.putalpha(mask)
web_512 = web_rgba.resize((512, 512), Image.Resampling.LANCZOS)
web_512.save(BRAND_DIR / "sg-logo-web.png", format="PNG", optimize=True)

# Helper to composite onto Obsidian #0B1119 square with small safe margin for app icons
OBSIDIAN = (11, 17, 25, 255)

def make_square_icon(size: int, margin_ratio: float = 0.04) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), OBSIDIAN)
    inner = max(1, round(size * (1 - 2 * margin_ratio)))
    resized = web_rgba.resize((inner, inner), Image.Resampling.LANCZOS)
    offset = (size - inner) // 2
    canvas.alpha_composite(resized, (offset, offset))
    return canvas

make_square_icon(512, 0.03).save(BRAND_DIR / "icon-512.png", format="PNG", optimize=True)
make_square_icon(192, 0.03).save(BRAND_DIR / "icon-192.png", format="PNG", optimize=True)
apple_180 = make_square_icon(180, 0.04)
apple_180.save(ROOT / "public" / "apple-touch-icon.png", format="PNG", optimize=True)
apple_180.save(ROOT / "app" / "apple-icon.png", format="PNG", optimize=True)

# Circular favicons (keep full circular ring legibility at 32px and 16px)
fav_32 = web_rgba.resize((32, 32), Image.Resampling.LANCZOS)
fav_16 = web_rgba.resize((16, 16), Image.Resampling.LANCZOS)
fav_48 = web_rgba.resize((48, 48), Image.Resampling.LANCZOS)
fav_32.save(ROOT / "public" / "favicon-32x32.png", format="PNG", optimize=True)
fav_16.save(ROOT / "public" / "favicon-16x16.png", format="PNG", optimize=True)

# Multi-size favicon.ico
fav_48.save(
    ROOT / "app" / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)

print("Generated all raster SG brand assets successfully.")

