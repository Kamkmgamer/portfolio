import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactConfirmationEmailProps {
  userName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const ContactConfirmationEmail = ({
  userName = "there",
}: ContactConfirmationEmailProps) => {
  const previewText = `Thanks for reaching out, ${userName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  gold: "#D4AF37",
                  dark: "#1a1a1a",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-20 px-4 max-w-2xl">
            <Section className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-linear-to-br from-[#D4AF37] to-[#B8860B] px-8 py-12 text-center">
                <Img
                  src={`${baseUrl}/favicon.ico`}
                  width="48"
                  height="48"
                  alt="Khalil Mageed"
                  className="mx-auto mb-4"
                />
                <Heading className="text-3xl font-bold text-[#D4AF37] m-0">
                  Message Received
                </Heading>
              </div>

              <Section className="px-8 py-10">
                <Text className="text-gray-600 text-lg leading-relaxed mb-6">
                  Hi{" "}
                  <span className="font-semibold text-[#D4AF37]">
                    {userName}
                  </span>
                  ,
                </Text>

                <Text className="text-gray-600 text-lg leading-relaxed mb-6">
                  Thank you for taking the time to reach out! I&apos;ve received
                  your message and I&apos;m genuinely excited to connect with
                  you.
                </Text>

                <Section className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border-l-4 border-[#D4AF37]">
                  <Text className="text-gray-700 m-0 font-medium">
                    I&apos;ll carefully review your message and get back to you
                    as soon as possible. Typically, I respond within 24-48
                    hours.
                  </Text>
                </Section>

                <Text className="text-gray-600 text-lg leading-relaxed mb-8">
                  In the meantime, feel free to explore my{" "}
                  <a
                    href={`${baseUrl}/projects`}
                    className="text-[#D4AF37] underline"
                  >
                    projects
                  </a>{" "}
                  or learn more about{" "}
                  <a
                    href={`${baseUrl}/research`}
                    className="text-[#D4AF37] underline"
                  >
                    my research
                  </a>
                  .
                </Text>

                <Hr className="border-gray-200 my-8" />

                <Text className="text-gray-500 text-sm">Best regards,</Text>
                <Text className="text-gray-800 font-semibold text-lg mb-2">
                  Khalil Mageed
                </Text>
                <Text className="text-gray-500 text-sm">
                  Software Engineer & Researcher
                </Text>
              </Section>

              <Section className="bg-gray-50 px-8 py-6 text-center">
                <Text className="text-gray-400 text-xs mb-4">
                  This email was sent from noreply@khalil.mageed.net
                </Text>
                <Button
                  className="bg-[#D4AF37] text-white font-semibold py-3 px-6 rounded-lg"
                  href={baseUrl}
                >
                  Visit Portfolio
                </Button>
              </Section>
            </Section>

            <Section className="mt-10 text-center">
              <Text className="text-gray-400 text-sm">
                © 2026 Khalil Mageed. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactConfirmationEmail;
