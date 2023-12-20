import modalView from "./components/modal-view";
let Vue = null;
function install(_vue) {
  Vue = _vue;
  Vue.component("modal-view", modalView);
  //希望每个子组件 都可以获得到modal属性
  Vue.mixin({
    beforeCreate() {
      // mixin 可以给beforeCreate 这个生命周期增加合并方法
      // 渲染流程是先父后子
      if (this.$options.modal) {
        this._modalRoot = this; //把当前实例挂载到_routerRoot上
        this._modal = this.$options.modal; //router实例
      } else {
        this._modalRoot = this.$parent && this.$parent._modalRoot;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$modal", {
    get() {
      return this._modalRoot._modal;
    },
  });
}
export { install, Vue };
