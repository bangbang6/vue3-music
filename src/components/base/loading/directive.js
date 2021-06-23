// !vue自定义是操作dom最好的地方 因为暴露啦dom给你
//!指令就是一个对象 就是一些钩子函数
import {createApp} from 'vue'
import Loading from './Loading.vue'
import {addClass,removeClass} from '@/assets/js/dom'
const loadingDirective = {
  mounted(el,binding){ //刚绑定
    const app = createApp(Loading) //更组件是Loading的vue实例 为什么不是直接添加dom 因为loading是个vue文件不是单个dom 如果是单个dom可以直接append 不用创建vue实例
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    const title = binding.arg.title
    console.log('title',title);
    if(typeof title !== 'undefined'){
      instance.setTitle(title)
    }
    if(binding.value){
      append(el)
    }
  },
  updated(el,binding){ //传入的值更新的时候
    const title = binding.arg.title
    //动态参数
    if(typeof title !== 'undefined'){
      el.instance.setTitle(title)
    }
    if(binding.value!==binding.oldValue){
      binding.value?append(el):remove(el)
    }
  }
}

function append(el){
  const style = getComputedStyle(el)
 
  if(['absolute','fixed','relative'].indexOf(style.position) === -1){
    //外层元素不是绝对定位 我们给他加这个 因为我们想让这个loading在这个元素中间显示 而不是整个屏幕中间显示
    addClass(el,'g-relative')
  }
  el.appendChild(el.instance.$el)
}
function remove(el){
  removeClass(el,'g-relative')
  el.removeChild(el.instance.$el)
}
export default loadingDirective 