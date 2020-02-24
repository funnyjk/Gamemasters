// @ts-ignore
import sgMail from '@sendgrid/mail';

interface IForgotPassword {
    to: string;
    token: string;
    id: string;
    url: string;
};
export const forgotPasswordSend = async ({to, token,id, url}: IForgotPassword) => {
    const link = `${url}/#/reset/${id}/${token}`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to,
        from: 'no-reply@gmmstrs.com',
        subject: 'Reset Password',
        // text: `${url}/#/reset/${id}/${token}`,
        html: `<a href=${link}>${link}</a>`
    };

    sgMail.send(msg);
};