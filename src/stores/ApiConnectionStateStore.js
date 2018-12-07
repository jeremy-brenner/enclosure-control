import UpdatingStore from './UpdatingStore.js';
import { getApiVersion } from '../rest/OctoConnection.js';

class ApiVersionStore extends UpdatingStore {
  update() {
    getApiVersion()
      .then(({data, apiStatus})=> this.set({...data, apiStatus}));
  }
}

export default new ApiVersionStore({state: 'Unknown'});