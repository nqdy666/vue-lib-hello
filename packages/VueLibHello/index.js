// 导入组件，组件必须声明 name
import VueLibHello from './src/main.vue'
// 为组件添加 install 方法，用于按需引入
console.log('VueLibHello.name', VueLibHello.name)
VueLibHello.install = function(Vue) {
  Vue.component(VueLibHello.name, VueLibHello)
}
export default VueLibHello
