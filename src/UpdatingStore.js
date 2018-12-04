import { Store } from 'svelte/store.js';

class UpdatingStore extends Store {
  update() {
    console.log('you should override the update method');
  }
  start(refreshTimeMs=5000) {
    if(!this.interval){
      this.update();
      this.interval = setInterval( () => this.update(), refreshTimeMs );
    }
  }
  stop() {
    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default UpdatingStore;