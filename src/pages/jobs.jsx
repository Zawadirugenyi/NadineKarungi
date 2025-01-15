import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Grid, Card, CardBody, Stack } from '@chakra-ui/react';
import axios from 'axios';
import heroImage from '../Components/Assetes/home1.webp';
import { useNavigate } from 'react-router-dom';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Pour naviguer vers le formulaire de candidature

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/jobinternships/');
        setJobs(response.data);
        setError('');
      } catch (err) {
        console.error('Erreur lors de la récupération des emplois :', err);
        setError('Échec de la récupération des emplois. Veuillez réessayer.');
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    console.log(`Candidature pour le poste avec ID : ${jobId}`);
    // Naviguer vers le formulaire de candidature ou tout autre chemin souhaité
    navigate(`/application/${jobId}`);  // Adaptez la route selon la structure de votre application
  };

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
            Emplois et Stages
          </Heading>
        </Box>
      </Box>

      {/* Section Emplois */}
      <Heading as="h2" size="xl" mb={4} textAlign="center" marginTop="30px">
        Emplois et Stages
      </Heading>
      <Text mb={4} textAlign="center">
        Rejoignez notre équipe ! Nous cherchons toujours des personnes talentueuses pour nous aider à grandir.
      </Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}

      {/* Cartes des Emplois */}
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={6}>
        {jobs.map((job, index) => (
          <Card key={index} bg="white" boxShadow="md" borderRadius="md">
            <CardBody>
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  {job.title}
                </Heading>
                <Text>{job.description}</Text>
                <Button
                  onClick={() => handleApply(job.id)}
                  color="#2a8fc1"
                  size="lg"
                  _hover={{ bg: 'yellow.200' }}
                  px={8}
                  mt="10px"
                >
                  Postuler
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default JobsSection;
