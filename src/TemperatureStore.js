import UpdatingStore from './UpdatingStore.js';
import { getPrinterState } from './OctoConnection.js';

class TemperatureStore extends UpdatingStore {
  update() {
    getPrinterState('history=true&limit=1000').then(({temperature})=> {
      this.set({history: temperature.history});
    });
  }
}

export default new TemperatureStore({history:[]});