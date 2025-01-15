import React from 'react';
import { Box, Grid, Heading, Text, Button } from '@chakra-ui/react';
import heroImage from '../Components/Assetes/home2.jpg'; // Corrigé la faute de frappe dans 'Assetes'

const AboutUsSection = () => {
  return (
    <>
      {/* Section Hero */}
      <Box
        w="100vw"
        h="50vh"
        bgImage={`url(${heroImage})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        borderRadius="none"
        m={0} // Retirer les marges
        p={0} // Retirer les paddings
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.6)" // Superposition sombre pour une meilleure lisibilité du texte
        />
        <Box zIndex="1" textAlign="center" color="white" p={8}>
          <Heading as="h1" size="2xl" mb={4}>
            À propos de nous
          </Heading>
        </Box>
      </Box>

      {/* Section À propos de nous */}
      <Box id="about-us" p={8} bg="gray.100">
        {/* Carte principale */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          p={8}
          mb={8} // Marge pour séparer des autres sections
        >
          <Heading as="h2" size="xl" mb={8} textAlign="center" color="#2a8fc1">
            Qui sommes-nous ?
          </Heading>

          {/* Grille des trois cartes */}
          <Grid
            templateColumns={{
              base: '1fr', // Colonne unique sur les écrans plus petits
              md: '1fr 1fr 1fr', // Trois colonnes sur les écrans moyens et plus grands
            }}
            gap={8}
            alignItems="stretch"
          >
            {/* Carte Qui sommes-nous ? */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Qui sommes-nous ?
              </Heading>
              <Text mb={4} fontSize="lg">
                Nous sommes une entreprise leader avec pour mission de révolutionner l'industrie. Notre équipe de professionnels est dédiée à fournir des services de qualité à nos clients. Forts de plusieurs années d'expérience dans le domaine, nous nous efforçons d'apporter des solutions innovantes adaptées aux besoins uniques de chaque client.
              </Text>
            </Box>

            {/* Carte Mission */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Notre mission
              </Heading>
              <Text mb={4} fontSize="lg">
                Notre mission est de renforcer les entreprises en leur fournissant des solutions innovantes qui simplifient leurs opérations et améliorent leur efficacité. Nous visons à être un partenaire fiable pour chaque client, les aidant à atteindre leurs objectifs et à réussir de manière durable.
              </Text>
            </Box>

            {/* Carte Vision */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Notre vision
              </Heading>
              <Text mb={4} fontSize="lg">
                Notre vision est de devenir un leader mondial dans notre secteur, en offrant des services exceptionnels qui favorisent le progrès et encouragent les relations à long terme. Nous nous efforçons d'être une entreprise reconnue pour son innovation, sa fiabilité et son engagement envers la satisfaction des clients.
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsSection;
