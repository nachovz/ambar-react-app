import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

export const getPDF = async (file) => {
  try {
    const blob = await client.get(`${ENDPOINTS.DCS}/${file}`, {responseType: 'blob'});
    showFile(blob, file);
  } catch (error) {
    throw error;
  }
};

const showFile = (blob, file) => {
  var newBlob = new Blob([blob], {type: "application/pdf"});

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download=file;
  document.body.appendChild(link);
  link.click();
  setTimeout(function(){
    window.URL.revokeObjectURL(data);
  }, 100);
};