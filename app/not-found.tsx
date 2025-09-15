import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen matrix-bg flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-cyan-400">404</span>
          </h1>
          <h2 className="text-2xl font-semibold mb-4">
            <span className="text-green-400">Page Not Found</span>
          </h2>
          <p className="text-gray-400">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-green-400 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
