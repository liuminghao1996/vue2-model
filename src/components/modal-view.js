let modalComponent = null;
export default {
  name: "modal-view",
  data() {
    return {
      visible: false,
      options: {},
    };
  },

  methods: {
    open(modalName, options = {}) {
      this.options = options;
      return new Promise((resolve) => {
        modalComponent = this.$modal.getModal(modalName);
        this.visible = true;
        const close = () => {
          this.close();
          resolve();
        };
        this.$modal.close = close;
      });
    },
    close() {
      this.visible = false;
    },
  },
  mounted() {
    this.$modal.open = this.open;
    this.$modal.close = this.close;
  },
  render(h) {
    // console.log(this.$attrs, this.$el, this.props);
    return h(
      "transition",
      {
        attrs: {
          name: "fade",
        },
        on: {
          afterLeave: () => {
            modalComponent = null;
          },
        },
      },
      [
        h(
          "div",
          {
            directives: [
              {
                name: "show",
                value: this.visible,
              },
            ],

            class: "modal-wrapper",
          },
          modalComponent
            ? [
                h(
                  modalComponent.component,
                  {
                    props: this.options.props,
                    on: this.options.on,
                  },
                  ""
                ),
              ]
            : ""
        ),
      ]
    );
  },
};
