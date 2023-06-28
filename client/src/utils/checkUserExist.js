export const checkUserExist = (newUserData) => {
  const existUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

  return existUsers.find((e) => e.email === newUserData.email);
};
