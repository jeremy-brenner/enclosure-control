import { Store } from 'svelte/store.js';

class AppDataStore extends Store {

}

const defaults = {
  conf: {
    powerButtons: [],
    temperatureControls: []
  },
  printerState: {
    temperature: {
      history: []
    }
  },
  connectionState: {
    current: {
      
    }
  },
  outputStates: []
}

export default new AppDataStore(defaults);
