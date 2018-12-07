import UpdatingStore from './UpdatingStore.js';
import { getConnectionState, connectToPrinter } from '../rest/OctoConnection.js';

class PrinterConnectionStore extends UpdatingStore {
  connect() {
    connectToPrinter()
      .then(() => this.set({state:'Unknown'}))
      .then(() => this.update());
  }
  update() {
    getConnectionState()
      .then(({data, apiStatus})=> this.set({state: data.current.state, apiStatus}));
  }
}


export default new PrinterConnectionStore({});