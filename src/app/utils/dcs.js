import client from 'app/client';
import ENDPOINTS from 'app/constants/endpoints';

export const getDCS = async (file) => {
  try {
    await client.get(`${ENDPOINTS.DCS}/${file}`);
  } catch (error) {
    throw error;
  }
};
