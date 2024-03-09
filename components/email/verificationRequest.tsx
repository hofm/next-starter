import {
  Body,
  Container,
  Head,
  Button,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerificationRequestProps {
  siteName?: string;
  year?: string;
  url: string;
}

const baseUrl = 'https://astro-moments.vercel.app';

export const VerificationRequest = ({
  siteName,
  year,
  url,
}: VerificationRequestProps) => {
  const previewText = `Anmelden bei ${siteName}`;

  return (
    <Html lang='de'>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/img/logo.png`}
                width='154'
                height='42'
                alt='moments FOTOGRAFIE'
                className='mx-auto my-0'
              />
            </Section>
            <Section className='mt-[32px] text-center'>
              <Button
                className='rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline'
                href={url}
              >
                Anmelden
              </Button>
            </Section>
            <Text className='mt-10 text-center text-[14px] leading-[24px] text-black'>
              Wenn Sie diese E-Mail nicht angefordert haben, können Sie sie
              getrost ignorieren.
            </Text>
          </Container>
          <Section className='m-auto max-w-[580px]'>
            <Row>
              <Text className='text-center text-gray-500'>
                © {year} {siteName}, All Rights Reserved
              </Text>
              <Text className='text-center text-gray-500'>
                {siteName}, Kapellenstr. 8, 79292 Pfaffenweiler
                <br />
                +49 (0) 173 / 7 933 032
                <br />
                mail@moments-fotografie.com
                <br />
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationRequest;
