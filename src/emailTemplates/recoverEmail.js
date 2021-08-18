import { APP_NAME, getMailGenerator } from './config';

const emailTemplate = (link) => ({
  body: {
    intro: `Welcome to ${APP_NAME}!`,
    action: {
      instructions:
        "You're almost there. To finish resetting your password, please click on this button below.",
      button: {
        color: '#1c0091',
        text: 'Reset Password',
        link,
      },
    },
    outro: 'If you did not initiate this request, please ignore this mail.',
  },
});

const generateResetEmail = (token) => {
  const { BASE_URL_RESET } = process.env;
  const mailGenerator = getMailGenerator(BASE_URL_RESET);
  const mail = emailTemplate(`${BASE_URL_RESET}/reset-password?authorization=${token}`);
  return mailGenerator.generate(mail);
};

export default generateResetEmail;
