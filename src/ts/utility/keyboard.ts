export class Keyboard {
  static plugins: Map<string, any>;

  static keyCodes = new Map(Object.entries({
    9: 'TAB',
    13: 'ENTER',
    27: 'ESCAPE',
    32: 'SPACE',
    35: 'END',
    36: 'HOME',
    37: 'ARROW_LEFT',
    38: 'ARROW_UP',
    39: 'ARROW_RIGHT',
    40: 'ARROW_DOWN',
  }));

  static register() {

  }
}
