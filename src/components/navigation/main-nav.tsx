import Link from 'next/link'

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 mx-6 lg:space-x-6">
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/tickets"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tickets
      </Link>
    </nav>
  )
}