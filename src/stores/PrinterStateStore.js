import UpdatingStore from './UpdatingStore.js';
import { getPrinterState, setTemp } from '../rest/OctoConnection.js';

class TemperatureStore extends UpdatingStore {
  update() {
    getPrinterState('history=true&limit=1000')
    .then((state) => this.set(state));
  }
  setTemp(key,temp) {
    setTemp(key,temp)
      .then(() => this.update());
  }
}

export default new TemperatureStore();