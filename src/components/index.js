import Vue from 'vue'
import Message from './Message'
import Modal from './Modal'

const components = {
  Message,
  Modal
}

// 通过循环注册组件
for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}