import { LINK_VALUES } from 'app/constants/values';

export const openLink = (type, query) => {
  window.open(`${LINK_VALUES[type]}${query}`);
}