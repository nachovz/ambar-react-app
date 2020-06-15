import tinycolor from 'tinycolor2';

const COLOURS ={ 
  "AMB": {
    PRIMARY: '#0079af',
    PRIMARYLIGHT: '#55a8e1',
    PRIMARYDARK: '#004d7f',
    SECONDARY: '#af3700',
    SECONDARYLIGHT: '#e86731',
    SECONDARYDARK: '#790000',
    GREY: '#616161',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    LIGHTGREY: '#ececec',
    RED: '#F44336',
    TRANSPARENT: tinycolor({ r: 0, g: 0, b: 0, a: 0 }),
    RECOGIDA: '#03A9F4',
    ENTREGA: '#00C9E3',
    SERVICIO: '#0277BD'
  },
  "MRE": {
    PRIMARY: '#042F4C',
    PRIMARYLIGHT: '#495A65',
    PRIMARYDARK: '#042F4C',
    SECONDARY: '#7AB41E',
    SECONDARYLIGHT: '#495A65',
    SECONDARYDARK: '#7AB41E',
    GREY: '#616161',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    LIGHTGREY: '#ececec',
    RED: '#F44336',
    TRANSPARENT: tinycolor({ r: 0, g: 0, b: 0, a: 0 }),
    RECOGIDA: '#EDA85B',
    ENTREGA: '#A8C47C',
    SERVICIO: '#495A65'
  },
}

const getColor = (colorName) => {
  const theme = COLOURS[process.env.REACT_APP_COMPANY_CODE] || COLOURS['AMB'];
  const color = theme[colorName] || theme['PRIMARY'];
  return tinycolor(color).clone();
};

export default getColor;
