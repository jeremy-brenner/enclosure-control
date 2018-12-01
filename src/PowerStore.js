import { Store } from 'svelte/store.js';
import { getOutputStates, setOutputState } from './OctoConnection.js';

class PowerStore extends Store {
  constructor() {
    super({});
    this.update();
    this.startAutomaticUpdate();
  }
  killPower() {
    Promise.all( Object.keys(this.get()).map(key => setOutputState(key, false)) )
      .then( () => this.update() );;
  }
  toggle(apiId) {
    setOutputState(apiId, !this.get()[apiId])
      .then( () => this.update() );
  }
  update() {
    getOutputStates()
      .then( result => {
        const state = {};
        result.forEach(newState => state[newState.index_id] = newState.status);
        this.set(state);
      });
  }
  startAutomaticUpdate() {
    window.setInterval( () => this.update(), 1000 );
  }
}

export default new PowerStore();
