import React from 'react';
import { Box, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Flex } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import the image
import heroImage from '../Components/Assetes/home1.webp';

const FAQSection = () => {
  return (
    <Box>
      
       <Box
        w="100vw"
        h="40vh"
        bgImage={`url(${heroImage})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        m={0}
        p={0}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.6)" // Dark overlay for better text readability
        />
        <Box zIndex="1" textAlign="center" color="white" p={8}>
          <Heading as="h1" size="2xl" mb={4}>
          FAQ
          </Heading>
    
        </Box>
      </Box>

   
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="80vh" // Reduced height here
      bgImage={`url(${home3})`} // Set background image
      bgSize="cover" // Cover the entire section
      bgPosition="center" // Center the image
      p={4}
      backgroundBlendMode="overlay"
      backgroundColor="rgba(0, 0, 0, 0.5)" // Overlay effect to make text readable
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        width="80%"
        maxWidth="800px"
        textAlign="left"
      >
        <Heading as="h2" size="xl" mb={4}>
          Frequently Asked Questions (FAQs)
        </Heading>
        <Text mb={4}>
          Find answers to the most common questions regarding our banking services, accounts, loans, and more.
        </Text>

        {/* Accordion for Banking FAQ */}
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I open a bank account?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can open a bank account online through our website or by visiting any of our branches. You'll need a valid ID, proof of address, and an initial deposit.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What types of bank accounts do you offer?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              We offer various types of bank accounts, including savings accounts, current accounts, and fixed deposits. Each account type has its own benefits, and you can choose one based on your financial needs.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How can I apply for a loan?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can apply for a loan by visiting our branch or by filling out an online application form. Depending on the type of loan, we may require proof of income and credit history.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I reset my online banking password?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              To reset your online banking password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What is the interest rate on savings accounts?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Our savings accounts offer competitive interest rates that vary depending on the account type and balance. Please visit our interest rates page for the most up-to-date information.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Can I access my account from anywhere in the world?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Yes, you can access your account from anywhere in the world using our online banking platform. Simply log in with your credentials, and you can manage your account from any device with an internet connection.
            </AccordionPanel>
          </AccordionItem>

          {/* Add more AccordionItems as needed */}
        </Accordion>

        {/* Read More Button */}
    
      </Box>
    </Flex>
     </Box>
  );
};

export default FAQSection;
