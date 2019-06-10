// components/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: Array, // 简化的定义方式,
    value: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    shouldShowOptions: false
  },
  ready(){
    this.setData({selected:this.data.value?this.data.options[this.data.value]:""})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChangeFolding() {
      console.log(this.data)
      this.setData({
        shouldShowOptions: !this.data.shouldShowOptions
      })
    },
    onChoose(e) {
      console.log(e)
      this.setData({
        shouldShowOptions: false,
        selected: this.data.options[e.target.dataset.value]
      })
      this.triggerEvent('choose', e.target.dataset.value)
    },
  }
})