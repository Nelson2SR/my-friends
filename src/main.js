import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import cuCustom from './colorui/components/cu-custom.vue'
import cuBar from './colorui/components/cu-bar.vue'
import cuCard from './colorui/components/cu-card.vue'

import share from './common/share.js'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.mixin(share)
  
  app.component('cu-custom', cuCustom)
  app.component('cu-bar', cuBar)
  app.component('cu-card', cuCard)

  try {
    const e = uni.getSystemInfoSync()
    // #ifndef MP
    app.config.globalProperties.StatusBar = e.statusBarHeight;
    if (e.platform == 'android') {
      app.config.globalProperties.CustomBar = e.statusBarHeight + 50;
    } else {
      app.config.globalProperties.CustomBar = e.statusBarHeight + 45;
    }
    // #endif

    // #ifdef MP-WEIXIN
    app.config.globalProperties.StatusBar = e.statusBarHeight;
    const custom = wx.getMenuButtonBoundingClientRect();
    app.config.globalProperties.Custom = custom;
    app.config.globalProperties.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 50;
    // #endif		

    // #ifdef MP-ALIPAY
    app.config.globalProperties.StatusBar = e.statusBarHeight;
    app.config.globalProperties.CustomBar = e.statusBarHeight + e.titleBarHeight;
    // #endif
  } catch (e) {
    console.error('System info sync failed', e)
  }

  return {
    app,
    pinia
  }
}
