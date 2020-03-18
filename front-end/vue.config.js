module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: '../back-end/public',
  devServer: {
    proxy: {
      '^/yt/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
}