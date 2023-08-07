// import { url } from 'constants/url';

// export const getRandomAdvert = (setRenderData) => {
//   fetch(`${url}/Advert/${type}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json, text/plain',
//       'Content-Type': 'application/json;charset=UTF-8',
//     },
//     body: JSON.stringify({
//       [name]: data,
//     }),
//   })
//     .then(async (response) => {
//       if (!response.ok) {
//         const res = await response.json();
//         throw new Error(res.message);
//       }
//       return response.json();
//     })
//     .then((result) => {
//       console.log(result);
//       setRenderData(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
