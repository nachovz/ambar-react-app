import React from 'react';
import CameraImport, { FACING_MODES } from 'react-html5-camera-photo';
import './index.css';

const Camera = ({ onTakePhoto, backCamera=true, ...props }) => {
  return(
      <CameraImport
        onTakePhoto={onTakePhoto}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        isImageMirror={false}
        idealResolution = {{width: 640, height: 480}}
        sizeFactor = {0.5}
        {...props}/>
  );
}

export default Camera;