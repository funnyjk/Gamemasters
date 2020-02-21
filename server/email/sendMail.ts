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
    sgMail.setApiKey('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');
    const msg = {
        to,
        from: 'no-reply@gmmstrs.com',
        subject: 'Reset Password',
        // text: `${url}/#/reset/${id}/${token}`,
        html: `<a href=${link}>${link}</a>`
    };

    const onSend = await sgMail.send(msg);
};