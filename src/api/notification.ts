export const dataNotification = (() => {
  const notifications = [
    { id: '63fc7bbeccaf0c06588d253b', description: 'You have a new message.' },
    { id: '63fc61f5aed2c8790cc145c8', description: 'Your payment was successful.' },
    { id: '63fc635581845079cbfd99ba', description: 'A new version of the app is available.' },
    { id: '63fc63ae1f959379f7db7ea3', description: 'Your account has been suspended.' },
    { id: '63fc6496ee6f457a45bd572c', description: 'Your subscription has expired.' }
  ];

  return notifications;
})();

export const getNotifications = () => Promise.resolve({
  data: dataNotification,
  message: 'null',
  error: null
});