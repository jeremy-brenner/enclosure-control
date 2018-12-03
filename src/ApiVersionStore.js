import UpdatingStore from './UpdatingStore.js';
import { getApiVersion } from './OctoConnection.js';

class ApiVersionStore extends UpdatingStore {
  update() {
    getApiVersion()
    .then((data)=> this.set(data))
    .catch(() => this.set({api:false}));
  }
}

export default new ApiVersionStore({api:false});