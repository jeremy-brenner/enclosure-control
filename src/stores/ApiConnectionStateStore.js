import UpdatingStore from './UpdatingStore.js';
import { getApiVersion } from '../rest/OctoConnection.js';

class ApiVersionStore extends UpdatingStore {
  update() {
    getApiVersion()
    .then((data)=> this.set(data))
    .then(() => this.set({state: 'Connected'}))
    .catch(() => this.set({state: 'Error'}));
  }
}

export default new ApiVersionStore({state: 'Unknown'});