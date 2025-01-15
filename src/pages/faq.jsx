import React from 'react';
import { Box, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Flex } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import the image
import heroImage from '../Components/Assetes/home1.webp';

const FAQSection = () => {
  return (
    <Box>
      
      {/* Hero Section */}
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
            FAQ (Questions fréquemment posées)
          </Heading>
        </Box>
      </Box>

      {/* FAQ Section */}
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
            Questions Fréquentes (FAQs)
          </Heading>
          <Text mb={4}>
            Trouvez des réponses aux questions les plus courantes concernant nos services bancaires, comptes, prêts et plus encore.
          </Text>

          {/* Accordion for Banking FAQ */}
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Comment ouvrir un compte bancaire ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Vous pouvez ouvrir un compte bancaire en ligne via notre site Web ou en visitant l'une de nos agences. Vous aurez besoin d'une pièce d'identité valide, d'un justificatif de domicile et d'un dépôt initial.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Quels types de comptes bancaires proposez-vous ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Nous proposons différents types de comptes bancaires, y compris des comptes d'épargne, des comptes courants et des dépôts à terme. Chaque type de compte a ses propres avantages, et vous pouvez choisir celui qui correspond le mieux à vos besoins financiers.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Comment puis-je demander un prêt ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Vous pouvez demander un prêt en visitant notre agence ou en remplissant un formulaire de demande en ligne. Selon le type de prêt, nous pourrions vous demander des justificatifs de revenus et d'historique de crédit.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Comment réinitialiser mon mot de passe bancaire en ligne ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Pour réinitialiser votre mot de passe bancaire en ligne, cliquez sur le lien "Mot de passe oublié" sur la page de connexion. Vous recevrez un email avec des instructions pour réinitialiser votre mot de passe.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Quel est le taux d'intérêt des comptes d'épargne ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Nos comptes d'épargne offrent des taux d'intérêt compétitifs qui varient en fonction du type de compte et du solde. Veuillez consulter notre page des taux d'intérêt pour obtenir les informations les plus récentes.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Puis-je accéder à mon compte depuis n'importe où dans le monde ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Oui, vous pouvez accéder à votre compte depuis n'importe où dans le monde en utilisant notre plateforme bancaire en ligne. Connectez-vous simplement avec vos identifiants, et vous pourrez gérer votre compte depuis n'importe quel appareil connecté à Internet.
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
