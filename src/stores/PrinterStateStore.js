import UpdatingStore from './UpdatingStore.js';
import { getPrinterState } from '../rest/OctoConnection.js';

class TemperatureStore extends UpdatingStore {
  update() {
    getPrinterState('history=true&limit=1000').then((state)=> {
      this.set(state);
      console.log(this.get());
    });
  }
}

export default new TemperatureStore();