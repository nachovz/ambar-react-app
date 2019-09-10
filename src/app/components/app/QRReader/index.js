import React from 'react'
import ReactQrReader from 'react-qr-reader'

const QRReader = ({ onScan }) => {
  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  }

  const handleError = (error) => {
    console.log('QR ERROR', error);
  }

  return (
    <div>
      <ReactQrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRReader;
