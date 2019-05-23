import { camelCase, fire, kebabCase, random } from '../helper';

export class Plugin {
  public element: HTMLElement;
  public elementId: string;
  public options: Map<string, any>;

  private _pluginName: string;
  private _pluginId: string;

  constructor(pluginName: string, element: HTMLElement) {
    this.element = element;
    this.elementId = element.id;
    this.pluginName = pluginName;
    this.pluginId = this.pluginName;

    this.element.setAttribute('data-base-plugin', this.pluginId);

    if (
      !this.element.hasAttribute(`data-${this.pluginName}`) ||
      this.element.getAttribute(`data-${this.pluginName}`).length === 0
    ) {
      this.element.setAttribute(`data-${this.pluginName}`, this.pluginId);
    }

    fire(this.element, `init.base.${camelCase(this.pluginName)}`);
  }

  public set pluginName(pluginName: string) {
    this._pluginName = kebabCase(pluginName);
  }

  public get pluginName() {
    return this._pluginName;
  }

  public set pluginId(pluginName: string) {
    this._pluginId = random(6, pluginName);
  }

  public get pluginId() {
    return this._pluginId;
  }

  public setOptions(options: Object, defaults: Map<string, any>): void {
    if (options instanceof Object) {
      this.options = new Map([...defaults, ...new Map(Object.entries(options)), ...this._dataset]);
    } else {
      this.options = new Map([...defaults, ...this._dataset]);
    }
  }

  private get _dataset(): Map<string, any> {
    return new Map(Object.entries(this.element.dataset).filter(key => !(key.includes('basePlugin') || key.includes(camelCase(this.pluginName)))));
  }
}
