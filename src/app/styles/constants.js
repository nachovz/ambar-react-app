import ambar from 'app/images/ambar.png';
import reciclauto from 'app/images/reciclauto.png';

export const ZINDEX = {
  'MODAL': 999,
  'OVERLAY': 1301 
};

export const NAVBAR_HEIGHT = '50px';
export const MENU_WIDTH = '280px';
export const STEPNAV_HEIGHT = '75px';

export const getLogo = () =>{
  let logo = "";
  switch(process.env.REACT_APP_COMPANY_CODE){
    case "MRE":
      logo = reciclauto
    break;
    default:
      logo = ambar;
    break;
  }

  return logo;
}