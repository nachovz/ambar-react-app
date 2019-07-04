import { createMuiTheme } from '@material-ui/core/styles';
import getColor from './';
import tinycolor from 'tinycolor2';

const theme = createMuiTheme({
  palette: {
    common:{
      black: `${getColor('BLACK')}`,
      white: `${getColor('WHITE')}`
    },
    primary: {
      light: `${getColor('PRIMARYLIGHT')}`,
      main: `${getColor('PRIMARY')}`,
      dark: `${getColor('PRIMARYDARK')}`,
      contrastText: `${tinycolor.mostReadable(
        getColor('PRIMARY'),
        [],
        { includeFallbackColors:true }
      )}`,
    },
    secondary: {
      light: `${getColor('SECONDARYLIGHT')}`,
      main: `${getColor('SECONDARY')}`,
      dark: `${getColor('SECONDARYDARK')}`,
      contrastText: `${tinycolor.mostReadable(
        getColor('SECONDARY'),
        [],
        { includeFallbackColors:true }
      )}`,
    },
    error: {
      //light: palette.error[300],
      main: `${getColor('RED')}`,
      //dark: palette.error[700],
      contrastText: `${tinycolor.mostReadable(
        getColor('RED'),
        [],
        { includeFallbackColors:true }
      )}`,
    },
    text: {
      primary: `${getColor('BLACK')}`,
      secondary: `${getColor('GREY')}`,
      disabled: `${getColor('GREY')}`
    }
  },
  typography: {
    useNextVariants: true
  },
  mixins: {
    toolbar: {
      minHeight: '56px',
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: '48px',
      },
      '@media (min-width:600px)': {
        minHeight: '64px'
      }
    }
  }
});

export default theme;
