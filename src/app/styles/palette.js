import tinycolor from 'tinycolor2';

const COLOURS = {
  PRIMARY: '#0079af',
  PRIMARYLIGHT: '#55a8e1',
  PRIMARYDARK: '#004d7f',
  SECONDARY: '#af3700',
  SECONDARYLIGHT: '#e86731',
  SECONDARYDARK: '#790000',
  GREY: '#616161',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  LIGHTGREY: '#00000024',
  RED: '#F44336',
  TRANSPARENT: tinycolor({ r: 0, g: 0, b: 0, a: 0 })
};

const getColor = (colorName) => {
  const color = COLOURS[colorName] || COLOURS['PRIMARY'];
  return tinycolor(color).clone();
};

export default getColor;
