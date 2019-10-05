import React from 'react';
import CameraImport, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const Camera = ({ onTakePhoto, backCamera=true, ...props }) => {
  return(
      <CameraImport
        onTakePhoto={onTakePhoto}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        isImageMirror={false}
        {...props}/>
  );
}

export default Camera;