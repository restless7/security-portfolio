import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl">404</h1>
        <p>Page Not Found</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}
