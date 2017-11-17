import { Subject } from 'rxjs-es';

class Emitter {

  constructor() {
    this.subjects = [];
  }

  emit(name, data) {
    this.subjects[name] || (this.subjects[name] = new Subject());
    this.subjects[name].onNext(data);
  }

  on(name, handler) {
    this.subjects[name] || (this.subjects[name] = new Subject());
    this.subjects[name].subscribe(handler);
  }

  off(name) {
    try {
      this.subjects[name].dispose();
      delete this.subjects[name];
    } catch (exception) {
      console.error(exception);
    }

  }
}

export { Emitter };
