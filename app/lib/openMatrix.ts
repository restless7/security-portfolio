"use client"

export function openMatrix(eggId: string) {
  try {
    localStorage.setItem("matrix_last_egg", eggId)
    window.location.href = `/matrix-rain?egg=${eggId}`
  } catch {
    window.location.href = `/matrix-rain?egg=${eggId}`
  }
}
