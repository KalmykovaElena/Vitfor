import { saleData } from 'constants/saleData';
import { url } from 'constants/url';
import { setAdvert } from 'redux/reducers/advertReducer';
import store from 'redux/store';
import { history } from 'utils/history';

export const getAdvert = (id) => {
  fetch(`${url}/Adverts/GetAdvertCard`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      'ngrok-skip-browser-warning': '1',
    },
    body: JSON.stringify({
      advertId: id,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }
      return response.json();
    })
    .then((result) => {
      store.dispatch(setAdvert(result));
      const pathData = saleData.find((saleSection) =>
        saleSection.items?.find((saleSubSection) => saleSubSection.subsection === result.subsectionName)
      );
      const category = pathData.link;
      const subCategory = pathData.items.find(
        (saleSubSection) => saleSubSection.subsection === result.subsectionName
      ).search;
      if (subCategory) {
        history.navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${result.advertId}`);
      } else if (category) {
        history.navigate(`/sale/${category.slice(1)}/ad/${result.advertId}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
