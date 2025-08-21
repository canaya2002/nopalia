import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Desactivar ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // También desactivar errores de TypeScript durante el build si quieres
    ignoreBuildErrors: true,
  },
}

export default nextConfig