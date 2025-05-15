/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true, // Allow SVG for logos and icons
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript checks
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance and SEO optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      },
      {
        // Cache static assets longer
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg|woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Basic redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services-offered',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      
      // Handle common misspellings and variations
      {
        source: '/websites',
        destination: '/services/website-design',
        permanent: true,
      },
      {
        source: '/web-design',
        destination: '/services/website-design',
        permanent: true,
      },
      {
        source: '/ai',
        destination: '/services/ai-marketing',
        permanent: true,
      },
      {
        source: '/marketing',
        destination: '/services/ai-marketing',
        permanent: true,
      },
      {
        source: '/prices',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/packages',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/get-started',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/free-consultation',
        destination: '/contact',
        permanent: true,
      },
      
      // Trailing slash normalization
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      }
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      // Sitemap rewrites
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/sitemap-blog.xml',
        destination: '/api/sitemap-blog',
      },
      {
        source: '/sitemap-services.xml',
        destination: '/api/sitemap-services',
      },
      {
        source: '/sitemap-locations.xml',
        destination: '/api/sitemap-locations',
      },
      {
        source: '/sitemap-industries.xml',
        destination: '/api/sitemap-industries',
      },
      {
        source: '/sitemap-index.xml',
        destination: '/api/sitemap-index',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      
      // Marketing tools with clean URLs
      {
        source: '/tools/bio-generator',
        destination: '/api/tools/bio-generator',
      },
      {
        source: '/tools/marketing-calculator',
        destination: '/api/tools/marketing-calculator',
      },
      {
        source: '/tools/seo-analyzer',
        destination: '/api/tools/seo-analyzer',
      }
    ];
  },
  
  // Webpack configuration for performance
  webpack(config, { dev, isServer }) {
    // Optimize bundle size
    if (!dev && !isServer) {
      // Split chunks more aggressively for production
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  productionBrowserSourceMaps: false, // Disable source maps in production
  compress: true, // Enable compression
};

export default nextConfig; 