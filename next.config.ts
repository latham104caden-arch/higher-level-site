import type { NextConfig } from 'next'

// higherleveladz.com used to serve the agency dashboard. Old links
// (onboarding emails, pre-call links, client logins) keep working by
// forwarding those paths to the dashboard app.
const dashboardUrl = (
  process.env.NEXT_PUBLIC_CLIENT_LOGIN_URL || 'https://higher-level-dashboard.vercel.app'
).replace(/\/$/, '')

const dashboardPaths = ['dashboard', 'client', 'creator', 'demo', 'precall', 'onboarding', 'logout']

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return dashboardPaths.flatMap((p) => [
      { source: `/${p}`, destination: `${dashboardUrl}/${p}`, permanent: false },
      { source: `/${p}/:path*`, destination: `${dashboardUrl}/${p}/:path*`, permanent: false },
    ])
  },
}

export default nextConfig
