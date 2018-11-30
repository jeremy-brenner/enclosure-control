import conf from'../conf.json';
import { Store } from 'svelte/store.js';

class ConfStore extends Store {

}

export default new ConfStore(conf);