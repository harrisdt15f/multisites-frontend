const plugins = ['@vue/babel-plugin-transform-vue-jsx']
// 生产环境移除console
plugins.push('transform-remove-console')
module.exports = {
  plugins: plugins,
  presets: [
    '@vue/app'
  ]
}
