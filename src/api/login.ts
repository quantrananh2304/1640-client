export const dataUser = (() => {
  const user = {
    token: 'qweuhdasdjk'
  }

  return user;
})();

export const getToken = () => Promise.resolve({
  data: dataUser,
  message: 'null',
  error: null
});