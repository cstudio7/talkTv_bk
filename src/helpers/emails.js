import sgMail from '@sendgrid/mail';

/**
 * @param {string} sendgridApiKey
 * @param {string} to
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @return {string} emailResponse
 */
const sendMail = async (sendgridApiKey, to, from, subject, html) => {
  try {
    sgMail.setApiKey(sendgridApiKey);
    const msg = {
      to,
      from,
      subject,
      html,
    };
    return await sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendMail;
