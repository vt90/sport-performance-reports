import {
  amber200,
  amber500,
  amber800,
  cyan500,
  pink500,
  blue500,
  tealA400,
  lightGreenA400,
  deepOrange500,
  yellow500,
  pink200,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const theme = getMuiTheme({
  palette: {
    primary: pink500,
    primary1Color: pink500,
    primary2Color: amber500,
    primary3Color: cyan500,

    primary4Color: lightGreenA400,
    primary5Color: blue500,
    primary6Color: pink200,
    primary7Color: deepOrange500,
    primary8Color: tealA400,
    primary9Color: yellow500,

    activityCount1: amber200,
    activityCount2: amber500,
    activityCount3: amber800,

    notificationSuccess: lightGreenA400,
    notificationWarning: amber500,
    notificationError: deepOrange500,
  },
  appBar: {
    height: 50,
  },
});

export default theme;
