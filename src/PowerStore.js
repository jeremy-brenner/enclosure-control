import { Store } from 'svelte/store.js';
import { getOutputStates, setOutputState } from './OctoConnection.js';

const statusMap = {
  1: 'printerPower',
  2: 'lightPower',
  3: 'fanPower'
}

const idMap = {
  printerPower: 1,
  lightPower: 2,
  fanPower: 3
}

class PowerStore extends Store {
  keys() {
    return Object.keys(this.get());
  }
  killPower() {
    Promise.all( this.keys().map(key => setOutputState(key, false)) )
      .then( () => this.updateStates() );;
  }
  toggle(key) {
    setOutputState(key, !this.get()[key])
      .then( () => this.updateStates() );
  }
  updateStates() {
    getOutputStates().then( states => this.set(states) );
  }
}

const powerStore = new PowerStore({
  lightPower: false,
  fanPower: false,
  printerPower: false,
});

powerStore.updateStates();

export default powerStore;
