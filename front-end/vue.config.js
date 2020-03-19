module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: '../back-end/public',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/youtube/'
    : '/',
  devServer: {
    proxy: {
      '^/youtube/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/youtube/api': '/api', // remove base path
        },
        changeOrigin: true,
      }
    }
  }
}