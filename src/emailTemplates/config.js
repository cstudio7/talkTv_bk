import Mailgen from 'mailgen';

export const APP_NAME = 'Talk Music';

export const getMailGenerator = (link) => new Mailgen({
  theme: 'default',
  product: {
    name: APP_NAME,
    link,
  },
});
