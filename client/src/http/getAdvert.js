import { saleData } from 'constants/saleData';
import { url } from 'constants/url';
import { setAdvert } from 'redux/reducers/advertReducer';

export const getAdvert = (id, dispatch, navigate) => {
  const token = localStorage.getItem('token');
  fetch(`${url}/Adverts/GetAdvertCard`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
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
      dispatch(setAdvert(result));
      const pathData = saleData.find((e) => e.items?.find((item) => item.subsection === result.subsectionName));
      const category = pathData.link;
      const subCategory = pathData.items.find((e) => e.subsection === result.subsectionName).search;

      if (subCategory && navigate) {
        navigate(`/sale/${category.slice(1)}/${subCategory}/ad/${result.advertId}`);
      } else if (category) {
        navigate(`/sale/${category.slice(1)}/ad/${result.advertId}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
