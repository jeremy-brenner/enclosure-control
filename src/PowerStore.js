import { Store } from 'svelte/store.js';
import { getOutputStates, setOutputState } from './OctoConnection.js';

class PowerStore extends Store {
  killPower() {
    Promise.all( Object.keys(this.get()).map(key => setOutputState(key, false)) )
      .then( () => this.updateStates() );;
  }
  toggle(apiId) {
    setOutputState(apiId, !this.get()[apiId])
      .then( () => this.updateStates() );
  }
  updateStates() {
    getOutputStates()
      .then( result => {
        const state = {};
        result.forEach(newState => state[newState.index_id] = newState.status);
        this.set(state);
      });
  }
}

const powerStore = new PowerStore({});

powerStore.updateStates()
window.setInterval( () => powerStore.updateStates(), 1000 );

export default powerStore;
