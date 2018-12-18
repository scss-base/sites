import { $, $$ } from './base.dom';
import Plugins from '../plugins';

let trigger = null;

export default class Trigger {
  static get allowed() {
    return ['close', 'open', 'toggle'];
  }

  static get attributes() {
    return Trigger.allowed.map(name => `[data-${name}]`);
  }

  static get getInstance() {
    if (!trigger) {
      trigger = new Trigger();
    }

    return trigger;
  }

  constructor() {
    this.plugins = {};
    this.triggers = [];

    this._init();
    this._bind();
  }

  _init() {
    $$(Trigger.attributes).forEach(element => {
      const filterDataset = this._filterDataset(element);
      const targets = this._getTargets(filterDataset);

      this._setPlugins(targets);
      this.triggers.push({
        element,
        targets,
      });
    });
  }

  _bind() {
    this.triggers.forEach(trigger => {
      trigger.targets.forEach(target => {
        trigger.element.addEventListener('click', event => {
          event.preventDefault();
          this.plugins[target.id][target.method]();
        });
      });
    });
  }

  _filterDataset(element) {
    return Object.keys(element.dataset).reduce((filteredDataset, datasetName) => {
      if (Trigger.allowed.includes(datasetName)) {
        filteredDataset[datasetName] = element.dataset[datasetName];
      }
      return filteredDataset;
    }, {});
  }

  _getTargets(dataset) {
    return Object.keys(dataset).reduce((targets, datasetName) => {
      const targetId = `#${dataset[datasetName]}`;
      targets.push({
        id: dataset[datasetName],
        method: datasetName,
        element: $(targetId),
      });
      return targets;
    }, []);
  }

  _setPlugins(targets) {
    targets.forEach(target => {
      const pluginName = Object.keys(Plugins)
        .find(plugin => Object.keys(target.element.dataset).includes(Plugins[plugin].name));

      if (!this.plugins[target.id]) {
        this.plugins[target.id] = new Plugins[pluginName](target.element);
      }
    });
  }
}
