import { serverResponses } from 'constants/test';
import { setAdvert } from 'redux/reducers/advertReducer';

export const getAdvert = (id, dispatch) => {
  const response = serverResponses.find((e) => e.advertId === id);
  if (response) {
    dispatch(setAdvert(response));
  }
  return response;
};
