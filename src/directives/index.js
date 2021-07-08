// 负责管理所有的自定义指令

export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // dom表示当前指令作用的dom对象
    dom.onerror = function() {
      // 当图片异常的时候，会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value
    }
  }
}
