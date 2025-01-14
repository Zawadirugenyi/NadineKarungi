import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Grid, Card, CardBody, Stack } from '@chakra-ui/react';
import axios from 'axios';
import heroImage from '../Components/Assetes/home1.webp';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/jobinternships/'); // Adjust the endpoint if needed
        setJobs(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again.');
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
    // You can add logic here to navigate to an application form or submit a request.
  };

  return (

    
    <Box >


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
            Jobs&Internship
          </Heading>
    
        </Box>
      </Box>

      
      <Heading as="h2" size="xl" mb={4} textAlign="center"  marginTop="30px">
        Jobs and Internships
      </Heading>
      <Text mb={4} textAlign="center">
        Join our team! We are always looking for talented individuals to help us grow.
      </Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={6}>
        {jobs.map((job, index) => (
          <Card key={index} bg="white" boxShadow="md" borderRadius="md">
            <CardBody>
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  {job.title}
                </Heading>
                <Text>{job.description}</Text>
                <Button onClick={() => handleApply(job.id)}   marginLeft="00px"                     
                color="#2a8fc1"
                size="lg"
                _hover={{ bg: 'yellow.200' }}
                px={8}
                as="a"
                href="application"
                mt="10px">
                  Apply
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
