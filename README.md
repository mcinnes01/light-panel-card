# Light Panel Card

A comprehensive light control interface for Home Assistant dashboards supporting multiple light types with dimming, color temperature, and RGB color controls.

## Features

- ✨ **Smart Light Grouping**: Automatically categorizes lights as main lights, lamps, or accent lights
- 🎛️ **Full Controls**: Brightness slider, color temperature slider, RGB color presets
- 🎨 **Flexible Color Controls**: White temperature buttons + RGB color presets
- 📍 **Smart Entity Selection**: Configure by area, labels, or manual entity lists
- 🔧 **Responsive Design**: Works on desktop, tablet, and mobile dashboards

## Installation

### Via HACS (Custom Repository)

1. In Home Assistant, open **HACS**
2. Click the **⋮** (menu) in the top right
3. Select **Custom repositories**
4. Paste: `https://github.com/mcinnes01/light-panel-card`
5. Select Category: **Dashboard**
6. Click **Create**
7. Find "Light Panel Card" in HACS and click **Install**
8. Restart Home Assistant
9. Add to your dashboard (see Usage below)

### Manual Installation

1. Download `light-panel.js` from this repository
2. Save to your Home Assistant `config/www/` directory
3. In Home Assistant, go to **Settings → Dashboards → Resources**
4. Click **Create Resource**
5. URL: `/local/light-panel.js`
6. Resource type: `JavaScript Module`
7. Reload your dashboard

## Usage

Add to your Lovelace dashboard:

```yaml
type: custom:light-panel-card
entity: light.lounge_lamps
show_brightness: true
show_color_temp: true
show_colors: true
show_white_temps: true
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | required | Light entity to control |
| `name` | string | Entity name | Card title |
| `show_brightness` | boolean | true | Show brightness slider |
| `show_color_temp` | boolean | true | Show color temperature slider |
| `show_colors` | boolean | true | Show RGB color preset buttons |
| `show_white_temps` | boolean | true | Show white temperature buttons |

## Required Dependencies

This card requires the following HACS components:

- [button-card](https://github.com/custom-cards/button-card) (v7.0+)
- [mushroom-light-card](https://github.com/piitaya/lovelace-mushroom) (v5.0+) 
- [slider-entity-row](https://github.com/thomasloven/lovelace-slider-entity-row)

Install these via HACS before using Light Panel Card.

## Configuration Methods

The card can be configured in multiple ways:

### Simple Entity Configuration
```yaml
type: custom:light-panel-card
entity: light.lounge_lamps
```

### Advanced with Name Pattern
```yaml
type: custom:light-panel-card
entity: light.lounge_lamps
name: "Lounge Lights"
show_brightness: true
show_color_temp: true
show_colors: true
show_white_temps: true
```

## Light Control Features

### Brightness Control
- Smooth slider for brightness adjustment (0-100%)
- Real-time feedback

### Color Temperature
- Adjust color temperature from cool (6500K) to warm (2700K)
- Smooth gradient slider

### White Temperature Buttons
- **Cool**: 6500K (cool white)
- **Daylight**: 5000K (neutral white)
- **White**: 4000K (soft white)
- **Warm**: 2700K (warm white)

### Color Presets
- Orange, Blue, Green, Pink, Purple
- One-click color selection
- Full RGB support

## Compatibility

- Home Assistant 2025.1.0+
- Modern browsers with ES6 support
- Tested on desktop, tablet, and mobile

## Troubleshooting

**Card doesn't appear in editor:**
- Ensure resource is added correctly in Settings → Dashboards → Resources
- Check browser console for JavaScript errors
- Clear browser cache and reload

**Colors not showing:**
- Verify light supports RGB colors
- Check light's supported features

**Sliders not working:**
- Ensure dependencies are installed
- Check light entity is controllable

## License

MIT License - see LICENSE file

## Support

For issues, feature requests, or questions:
- [GitHub Issues](https://github.com/mcinnes01/light-panel-card/issues)
- [GitHub Discussions](https://github.com/mcinnes01/light-panel-card/discussions)

## Credits

Created by [@mcinnes01](https://github.com/mcinnes01)
