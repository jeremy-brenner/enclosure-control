import { Store } from 'svelte/store.js';

class OctoStore extends Store {

}

const store = new OctoStore({

});

store.on('state', (blah) => {
  console.log(blah);
})

export default store