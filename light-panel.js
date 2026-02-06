class LightPanelCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      config_method: 'area',
      area: null,
      label: null,
      name_patterns: {
        main: 'light',
        lamp: 'lamp',
        accent: 'strip|led',
      },
      entities: {},
      show_main_button: true,
      show_group_button: true,
      show_brightness: true,
      show_color_temp: true,
      show_colors: true,
      show_white_temps: true,
      show_scenes: true,
      color_temperatures: {
        cool: 6500,
        white: 4000,
        daylight: 5000,
        warm: 2700,
      },
      color_presets: [
        { name: 'Orange', color: [255, 127, 0] },
        { name: 'Blue', color: [0, 0, 255] },
        { name: 'Green', color: [0, 255, 0] },
        { name: 'Pink', color: [255, 192, 203] },
        { name: 'Purple', color: [128, 0, 128] },
      ],
      title: 'Light Control Panel',
      ...config,
    };

    if (!this.config.area && this.config.config_method === 'area') {
      throw new Error('Area configuration method requires "area" parameter');
    }
  }

  setHass(hass) {
    this.hass = hass;
    this._resolveEntities();
    this._render();
  }

  _resolveEntities() {
    const entities = {};

    switch (this.config.config_method) {
      case 'area':
        this._resolveByArea(entities);
        break;
      case 'label':
        this._resolveByLabel(entities);
        break;
      case 'pattern':
        this._resolveByPattern(entities);
        break;
      case 'manual':
        entities = { ...this.config.entities };
        break;
    }

    this.resolvedEntities = entities;
  }

  _resolveByArea(entities) {
    const areaId = this.config.area;
    const areaEntities = Object.entries(this.hass.states)
      .filter(([_, state]) => state.attributes?.area_id === areaId && state.entity_id.startsWith('light.'));

    this._categorizeEntities(areaEntities, entities);
  }

  _resolveByLabel(entities) {
    const label = this.config.label;
    const labelEntities = Object.entries(this.hass.states)
      .filter(([_, state]) => state.attributes?.labels?.includes(label) && state.entity_id.startsWith('light.'));

    this._categorizeEntities(labelEntities, entities);
  }

  _resolveByPattern(entities) {
    const patterns = this.config.name_patterns;
    const lights = Object.entries(this.hass.states)
      .filter(([_, state]) => state.entity_id.startsWith('light.'));

    entities.group = { entity_ids: lights.map(([id]) => id) };
    entities.main = { entity_ids: [] };
    entities.lamps = { entity_ids: [] };
    entities.accent = { entity_ids: [] };

    for (const [id, state] of lights) {
      const name = state.attributes?.friendly_name?.toLowerCase() || id.toLowerCase();

      if (new RegExp(patterns.main, 'i').test(name)) {
        entities.main.entity_ids.push(id);
      } else if (new RegExp(patterns.lamp, 'i').test(name)) {
        entities.lamps.entity_ids.push(id);
      } else if (new RegExp(patterns.accent, 'i').test(name)) {
        entities.accent.entity_ids.push(id);
      }
    }

    entities.scenes = this.config.scenes || [];
  }

  _categorizeEntities(lights, entities) {
    const patterns = this.config.name_patterns;
    entities.group = { entity_ids: lights.map(([id]) => id) };
    entities.main = { entity_ids: [] };
    entities.lamps = { entity_ids: [] };
    entities.accent = { entity_ids: [] };

    for (const [id, state] of lights) {
      const name = state.attributes?.friendly_name?.toLowerCase() || id.toLowerCase();

      if (new RegExp(patterns.main, 'i').test(name)) {
        entities.main.entity_ids.push(id);
      } else if (new RegExp(patterns.lamp, 'i').test(name)) {
        entities.lamps.entity_ids.push(id);
      } else if (new RegExp(patterns.accent, 'i').test(name)) {
        entities.accent.entity_ids.push(id);
      }
    }

    entities.scenes = this.config.scenes || [];
  }

  _render() {
    // This is a configuration card - actual rendering depends on your dashboard
    // For HACS integration, this demonstrates the card structure
    console.log('Light Panel Card rendered with entities:', this.resolvedEntities);
  }

  static getConfigElement() {
    return document.createElement('light-panel-editor');
  }

  static getStubConfig() {
    return {
      config_method: 'area',
      area: 'lounge',
      show_brightness: true,
      show_color_temp: true,
      show_colors: true,
      show_white_temps: true,
      show_scenes: true,
    };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define('light-panel-card', LightPanelCard);
