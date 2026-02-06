class LightPanelEditor extends HTMLElement {
  setHass(hass) {
    this.hass = hass;
  }
  setConfig(config) {
    this.config = config;
  }
  configChanged(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      composed: true,
    });
    this.dispatchEvent(event);
  }
  connectedCallback() {
    this._renderEditor();
  }
  _renderEditor() {
    this.innerHTML = `
      <div style="padding: 16px;">
        <p>Light Panel Card Editor</p>
        <p>Configuration Method:</p>
        <select id="config_method">
          <option value="area">By Area</option>
          <option value="label">By Label</option>
          <option value="pattern">By Name Pattern</option>
          <option value="manual">Manual Selection</option>
        </select>
        <p style="margin-top: 16px; font-size: 12px; color: #999;">
          See README.md for full configuration options
        </p>
      </div>
    `;
    const select = this.querySelector('#config_method');
    if (select) {
      select.value = this.config?.config_method || 'area';
      select.addEventListener('change', (e) => {
        const newConfig = { ...this.config, config_method: e.target.value };
        this.configChanged(newConfig);
      });
    }
  }
}
customElements.define('light-panel-editor', LightPanelEditor);
