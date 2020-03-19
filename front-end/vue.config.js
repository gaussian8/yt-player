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
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
}