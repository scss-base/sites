// import { Subject } from 'rxjs-es';

// let instance;

class Emitter {
  constructor () {
    console.log('test', document);
  }
  //
  // constructor() {
  //   if (!instance) instance = this;
  //   this.subjects = [];
  //   return instance;
  // }
  //
  // emit(name, data) {
  //   this.subjects[name] || (this.subjects[name] = new Subject());
  //   this.subjects[name].next(data);
  // }
  //
  // on(name, handler) {
  //   this.subjects[name] || (this.subjects[name] = new Subject());
  //   this.subjects[name].subscribe(handler);
  // }
  //
  // off(name) {
  //   try {
  //     this.subjects[name].dispose();
  //     delete this.subjects[name];
  //   } catch (exception) {
  //     console.error(exception);
  //   }
  //
  // }
}

export { Emitter };
