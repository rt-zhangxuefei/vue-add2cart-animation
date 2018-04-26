import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import 'assets/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
