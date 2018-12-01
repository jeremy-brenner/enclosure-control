import UpdatingStore from './UpdatingStore.js';
import { getPrinterState } from './OctoConnection.js';

class TemperatureStore extends UpdatingStore {
  update() {
    getPrinterState().then(state => {
      this.set({history:state.temperature.history});
    //   console.log( this.get() );
    });
  }
}


export default new TemperatureStore({history:[]});