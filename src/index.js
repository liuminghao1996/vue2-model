import { install } from "./install";
class Modal {
  constructor(options) {
    console.log("modal options", options);
    this.$options = options;
  }
  getModal(modalName) {
    const modals = this.$options.modals;
    const modalComponetInfo = modals.find((item) => item.name === modalName);
    if (modalComponetInfo) {
      return modalComponetInfo;
    } else {
      return console.error(`${modalName} modal is not found`);
    }
  }
}
Modal.install = install;
export default Modal;
