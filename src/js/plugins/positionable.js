import {Plugin} from './plugin';

export class Positionable extends Plugin {
  init() {
    this.originalPosition = this.options.get('position');
    this.originalAlignment = this.options.get('alignment');
  }
}
