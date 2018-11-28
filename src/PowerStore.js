import { Store } from 'svelte/store.js';

class PowerStore extends Store {
  keys() {
    return Object.keys(this.get());
  }
  killPower() {
    this.keys().forEach(key => this.set({[key]:false}));
  }
}

export default new PowerStore({
  lightPower: false,
  fanPower: false,
  printerPower: true,
});
