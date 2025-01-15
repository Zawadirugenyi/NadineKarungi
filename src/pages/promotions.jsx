import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Image, SimpleGrid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Image de fond
import heroImage from '../Components/Assetes/home1.webp'; // Image du héros

const PromotionsSection = () => {
  const [promotions, setPromotions] = useState([]); // Etat pour stocker les données des promotions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des données des promotions
    const fetchPromotions = async () => {
      try {
        const response = await fetch('https://microtousadmin.onrender.com/api/promotions/');
        const data = await response.json();
        setPromotions(data); // Enregistrement des données dans l'état
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des promotions:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPromotions(); // Appel de la fonction au montage du composant
  }, []);

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="lg" color="blue.500" />
        <Text>Chargement...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          Erreur : {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Section Hero */}
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
          bg="rgba(0, 0, 0, 0.6)" // Superposition sombre pour améliorer la lisibilité du texte
        />
        <Box zIndex="1" textAlign="center" color="white" p={8}>
          <Heading as="h1" size="2xl" mb={4}>
            Promotions
          </Heading>
        </Box>
      </Box>

      {/* Section Promotions */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        bgImage={`url(${home3})`}
        bgSize="cover"
        bgPosition="center"
        p={4}
        backgroundBlendMode="overlay"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={8}
          width={{ base: '100%', md: '95%', lg: '80%' }} // Ajuster la largeur en fonction de la taille de l'écran
          textAlign="center"
        >
          <Heading as="h2" size="xl" mb={4}>
            Promotions
          </Heading>
          <Text mb={4}>Découvrez nos dernières promotions et offres spéciales.</Text>

          {/* Affichage des promotions */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={8} mt={8}>
            {promotions.map((promotion) => {
              const imageUrl = promotion.image && promotion.image.startsWith('/media/')
                ? `http://127.0.0.1:8000${promotion.image}`
                : promotion.image;

              return (
                <Box
                  key={promotion.id}
                  bg="white"
                  p={6}
                  borderRadius="md"
                  boxShadow="lg"
                  textAlign="center"
                >
                  {/* Affichage de l'image si l'URL est fournie */}
                  {promotion.image && (
                    <Image
                      src={imageUrl}
                      alt={promotion.title}
                      borderRadius="md"
                      mb={4}
                      objectFit="cover"
                      width="100%"
                      height={{ base: '200px', md: '250px' }}
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                  )}

                  {/* Titre de la promotion */}
                  <Heading as="h3" size="md" mb={2}>
                    {promotion.title}
                  </Heading>

                  {/* Description de la promotion */}
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {promotion.description}
                  </Text>
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};

export default PromotionsSection;
