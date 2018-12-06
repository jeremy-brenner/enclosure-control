import UpdatingStore from './UpdatingStore.js';

class ConfStore extends UpdatingStore {
  update() {
    fetch('/conf.json')
    .then(res => res.json())
    .then(conf => this.set(conf));
  }
}

export default new ConfStore();