import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, Badge, SimpleGrid } from '@chakra-ui/react';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  
  // Replace this with the actual token you receive after authentication
  const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/facilities/', {
          headers: {
            Authorization: `Token ${token}`  // Using Token authentication
          }
        });
        setFacilities(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFacilities();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} p={5}>
      {facilities.map(facility => (
        <Box key={facility.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
          {facility.image && (
            <Image
              src={`http://127.0.0.1:8000${facility.image}`}
              alt={facility.name}
              boxSize="300px"
              objectFit="cover"
            />
          )}
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme={facility.interaction_type === 'register' ? 'green' : 'teal'}>
                {facility.interaction_type === 'register' ? 'Register' : 'Contact'}
              </Badge>
            </Box>

            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {facility.name}
            </Box>

            <Text mt={2}>{facility.description}</Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Facilities;
