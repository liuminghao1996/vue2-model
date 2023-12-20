# vue2-models 一个基于 vue2 的一个命令式调用 modal

## 使用

1. 引用

```javascript
import Modal from "vue2-modals";
Vue.use(Modal);
```

2. 初始化

```javascript
const modal = new Modal({
  modals: [
    {
      name: "modalName",
      component: () => import("./components/HelloWorld.vue"),
    },
  ],
});

new Vue({
  modal,
  render: (h) => h(App),
}).$mount("#app");
```

3. 在 App.vue 使用 modalView 组件

```html
<!-- modalView是全局组件，所以不需要引入，后面调用的modal会在这个modalView展示 -->
<template>
  <div id="app">
    <modal-view />
  </div>
</template>
```

4. 编写 modal 弹窗

```html
<template>
  <div class="hello">
    {{ msg }}
    <button @click="cutemit">促发emit</button>
    <button @click="closeModal">关闭弹窗</button>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    props: {
      msg: String,
    },
    methods: {
      closeModal() {
        this.$modal.close();
      },
      cutemit() {
        this.$emit("change", "hello world");
      },
    },
  };
</script>
```

5. 使用

```javascript
// this.$modal是当前new Modal的实例已经自定注册
await this.$modal.open("modalName", {
  // 传递给组件的props
  props: {
    msg: this.msg,
    obj: this.obj,
  },
  // 监听$emit出来得事件
  on: {
    change: (val) => {
      this.$modal.close();
    },
  },
});
```

6. API

- open(modalName,{props,on}) 打开弹窗

* close() 关闭弹窗
