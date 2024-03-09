import VerificationRequest from '@/components/email/verificationRequest';
import { render } from '@react-email/render';
import { SendVerificationRequestParams } from 'next-auth/providers/email';
import { createTransport } from 'nodemailer';

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  const emailHtml = render(
    VerificationRequest({
      siteName: 'moments FOTOGRAFIE',
      year: new Date().getFullYear() + '',
      url,
    }),
  );

  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Anmelden bei moments FOTOGRAFIE`,
    text: text({ url, host }),
    html: emailHtml,
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Anmelden bei ${host}\n${url}\n\n`;
}

export default sendVerificationRequest;
