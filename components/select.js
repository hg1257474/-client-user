// components/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeFolding:function(){
      this.setData({isExpand:!this.data.isExapnd})
    },
    onChoose:function(e){
      this.setData({isExpand:false,selected:e.target.id})
      this.triggerEvent('choose',e.target.id)
    },
  }
})
