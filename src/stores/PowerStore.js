import UpdatingStore from './UpdatingStore.js';
import { getOutputStates, setOutputState } from '../rest/OctoConnection.js';

class PowerStore extends UpdatingStore {
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
}

export default new PowerStore();
