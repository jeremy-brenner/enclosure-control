import UpdatingStore from './UpdatingStore.js';
import { getConnectionState, connect } from '../rest/OctoConnection.js';

class PrinterConnectionStore extends UpdatingStore {
  connect() {
    connect()
      .then(() => this.set({state:'Unknown'}))
      .then(() => this.update());
  }
  update() {
    getConnectionState().then(res => {
      this.set({state:res.current.state});
    });
  }
}


export default new PrinterConnectionStore({});