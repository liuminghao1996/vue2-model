let modalComponent = null;
export default {
  name: "modal-view",
  props: {
    name: {
      type: String,
      default: "fade",
    },
    mode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      options: {},
      componentVisible: false,
    };
  },

  methods: {
    open(modalName, options = {}) {
      this.options = options;
      return new Promise((resolve) => {
        modalComponent = this.$modal.getModal(modalName);
        this.visible = true;
        this.componentVisible = true;
        const close = () => {
          this.close();
          resolve();
        };
        this.$modal.close = close;
      });
    },
    close() {
      this.componentVisible = false;
    },
  },
  mounted() {
    this.$modal.open = this.open;
    this.$modal.close = this.close;
  },
  render(h) {
    return h(
      "div",
      {
        class: "modal-wrapper",
        directives: [
          {
            name: "show",
            value: this.visible,
          },
        ],
      },
      [
        h(
          "transition",
          {
            attrs: { name: this.name, mode: this.mode },
            on: {
              afterLeave: () => {
                modalComponent = null;
                this.visible = false;
              },
            },
          },
          [
            modalComponent
              ? h(
                  modalComponent.component,
                  {
                    props: this.options.props,
                    on: this.options.on,
                    directives: [
                      {
                        name: "show",
                        value: this.componentVisible,
                      },
                    ],
                  },
                  ""
                )
              : "",
          ]
        ),
      ]
    );
  },
};
