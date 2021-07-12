// 负责管理所有的自定义指令

export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令中的变量的解释 其中有一个属性叫做value
    // dom表示当前指令作用的dom对象
    // dom认为就是图片
    dom.src = dom.src || options.value // 初始化时，如果有值则赋值 如果没值则需要进行默认值赋值
    // 当图片有地址，但是地址没有记载成功的时候，就会报错触发图片的一个事件 => onerror
    dom.onerror = function() {
      // 当图片异常的时候，会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
