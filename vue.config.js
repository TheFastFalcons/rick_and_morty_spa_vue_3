const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/rick_and_morty_spa_vue_3/' : '/',
  transpileDependencies: true
}
