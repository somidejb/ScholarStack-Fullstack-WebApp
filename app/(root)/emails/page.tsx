import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({
  userFirstname,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body className="bg-white font-sans">
      <Container className="max-w-md mx-auto p-4 pt-6 pb-12">
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Koala"
          className="mx-auto"
        />
        <Text className="text-lg leading-relaxed">{`Hi ${userFirstname},`}</Text>
        <Text className="text-lg leading-relaxed">
          Welcome to Koala, the sales intelligence platform that helps you
          uncover qualified leads and close deals faster.
        </Text>
        <Section className="text-center">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            href="https://getkoala.com"
          >
            Get started
          </Button>
        </Section>
        <Text className="text-lg leading-relaxed">
          Best,
          <br />
          The Koala team
        </Text>
        <Hr className="border-gray-200 my-4" />
        <Text className="text-sm text-gray-500">
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

KoalaWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;