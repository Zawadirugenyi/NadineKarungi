import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import de l'image d'arrière-plan
import heroImage from '../Components/Assetes/home1.webp'; // Image de l'hero

const ActivitiesSection = () => {
  const [activities, setActivities] = useState([]); // État pour stocker les données récupérées
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les données des activités
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://microtousadmin.onrender.com/api/activities/');
        const data = await response.json();
        setActivities(data); // Stocker les données récupérées dans l'état
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des activités:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchActivities(); // Récupérer les données lorsque le composant est monté
  }, []);

  if (isLoading) {
    return <Box p={4}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={4}>Erreur : {error}</Box>;
  }

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
          bg="rgba(0, 0, 0, 0.6)" // Superposition sombre pour améliorer la lisibilité du texte
        />
        <Box zIndex="1" textAlign="center" color="white" p={8}>
          <Heading as="h1" size="2xl" mb={4}>
            Activités
          </Heading>
        </Box>
      </Box>

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh" // Ajuster la hauteur pour s'adapter au contenu
        bgImage={`url(${home3})`} // Image de fond
        bgSize="cover" // S'assurer que l'image couvre la section
        bgPosition="center" // Centrer l'image
        p={4}
        backgroundBlendMode="overlay" // Effet de superposition pour assombrir l'image
        backgroundColor="rgba(0, 0, 0, 0.5)" // Assombrir l'arrière-plan pour un meilleur contraste du texte
      >
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={8}
          width={{ base: '100%', md: '95%', lg: '80%' }} // Ajuster la largeur pour différentes tailles d'écran
          textAlign="center" // Centrer le texte horizontalement
        >
          <Heading as="h2" size="xl" mb={4}>
            Activités
          </Heading>
          <Text mb={4} fontSize={{ base: 'md', md: 'lg' }}>
            Découvrez les différentes activités que nous organisons pour engager nos clients et la communauté.
          </Text>

          {/* Rendre les activités */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={{ base: 4, md: 6 }} mt={8}>
            {activities.map((activity) => {
              const imageUrl = activity.image && activity.image.startsWith('/media/')
                ? `http://127.0.0.1:8000${activity.image}`
                : activity.image;

              return (
                <Box
                  key={activity.id}
                  bg="white"
                  p={6}
                  borderRadius="md"
                  boxShadow="lg"
                  textAlign="center"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }} // Effet au survol pour la carte
                >
                  {/* Rendre l'image si l'URL est fournie */}
                  {activity.image && (
                    <Image
                      src={imageUrl}
                      alt={activity.name}
                      borderRadius="md"
                      mb={4}
                      objectFit="cover"
                      width="100%"
                      height={{ base: '200px', md: '250px' }} // Ajuster la hauteur pour un design réactif
                      fallbackSrc="https://via.placeholder.com/150" // Utiliser une image de remplacement en cas d'erreur de chargement
                    />
                  )}

                  {/* Titre */}
                  <Heading as="h3" size="md" mb={2} fontSize={{ base: 'lg', md: 'xl' }}>
                    {activity.name}
                  </Heading>

                  {/* Description */}
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" mb={4}>
                    {activity.description}
                  </Text>

                  {/* Date, Heure et Lieu de l'activité */}
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" mb={4}>
                    Date: {activity.date} | Heure: {activity.start_hour} - {activity.end_hour} | Lieu: {activity.venue}
                  </Text>

                  {/* Bouton pour redirection */}
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
};

export default ActivitiesSection;
