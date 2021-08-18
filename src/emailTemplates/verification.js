import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (link) => ({
  body: {
    intro: `Welcome to ${APP_NAME}!`,
    action: {
      instructions:
        "We are are happy to see you on Our Application. Talk Music the the fastest growing platform where" +
          " you can upload, download and promote your songs",
      button: {
        color: '#de8fd5',
        text: 'Talk Music',
        link,
      },
    },
    outro: 'If you did not initiate this request, please ignore this mail.',
  },
});

const generateEmail = (user) => {
  const { BASE_URL } = process.env;
  const mailGenerator = getMailGenerator(BASE_URL);
  const email = emailTemplate(`${BASE_URL}`);
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};

export default generateEmail;
