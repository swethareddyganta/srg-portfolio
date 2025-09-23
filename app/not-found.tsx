import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
        <Link href="/" className="button-primary inline-flex items-center">
          Go back home
        </Link>
      </div>
    </main>
  )
}


