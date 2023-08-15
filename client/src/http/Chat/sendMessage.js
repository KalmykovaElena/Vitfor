import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

export const sendMessage = async (data) => {
  const token = localStorage.getItem('token');
  await fetch(`${url}/Message/SendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiverUserName: data.receiverUserName, text: data.text }),
  }).catch((response) => {
    if (response.status === 401) {
      refreshToken(sendMessage, data);
    } else console.log(response.statusText);
  });
};
