import { Store } from 'svelte/store.js';
import { getOutputStates, setOutputState } from './OctoConnection.js';

class PowerStore extends Store {
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
  start() {
    if(!this.interval){
      this.update();
      this.interval = setInterval( () => this.update(), 1000 );
    }
  }
  stop() {
    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    }
  }

}

export default new PowerStore();
