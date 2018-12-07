import UpdatingStore from './UpdatingStore.js';
import { getPrinterState, setTemp } from '../rest/OctoConnection.js';

class PrinterStateStore extends UpdatingStore {
  update() {
    getPrinterState('history=true&limit=1000')
      .then(({data, apiStatus}) => this.set({...data, apiStatus}));
  }
  setTemp(key,temp) {
    setTemp(key,temp)
      .then(() => this.update());
  }
}

export default new PrinterStateStore();