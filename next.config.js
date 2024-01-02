const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: atlas_cache_handler(),
});

function atlas_cache_handler() {
  if (process.env.ATLAS_CACHE_HANDLER_ENABLED !== undefined) {
    console.log('custom cache handler enabled')
    return {
      incrementalCacheHandlerPath: require.resolve('./.atlas/atlas-cache-handler.js'),
      isrMemoryCacheSize: 0
    }
  }

  return undefined
}
