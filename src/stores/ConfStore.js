import UpdatingStore from './UpdatingStore.js';

class ConfStore extends UpdatingStore {
  update() {
    fetch('/conf.json')
      .then(res => res.json())
      .then(conf => this.set({...conf,ready:true}));
    fetch('/md5.json')
      .then(res => res.json())
      .then(({md5sum}) => {
        if(!this.get().hasOwnProperty('md5sum')){
          this.set({md5sum});
        }
        if(md5sum !== this.get().md5sum){
          this.set({outOfDate:true});
        }
      });
  }
}

export default new ConfStore({outOfDate:false});