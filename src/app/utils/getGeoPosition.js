export default () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) resolve({});

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords: { latitude: lat, longitude: lng } } = position;
      resolve({ lat, lng });
    }, () => resolve({ lat:null, lng:null }));
  });
};