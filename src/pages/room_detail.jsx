import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Stack, Center, Spinner, Grid, Button } from '@chakra-ui/react';
import axios from 'axios';

const RoomDescription = () => {
  const [loading, setLoading] = useState(true);
  const [roomDescriptions, setRoomDescriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDescriptions = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Replace with your actual token
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };

        const response = await axios.get('http://127.0.0.1:8000/api/room-descriptions/', config);
        console.log(response.data); // Log the response data to inspect the URLs
        setRoomDescriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room descriptions:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRoomDescriptions();
  }, []);

  if (loading) {
    return (
      <Center height="300px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (roomDescriptions.length === 0) {
    return <Text>No room descriptions found.</Text>;
  }

  return (
    <Box p={9}>
      
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4} alignItems="center" marginLeft="100px"
      >
        {roomDescriptions.map((roomDescription, index) => (
          <Box key={index} p={9} shadow="md" borderWidth="1px" width="1180px">
            <Heading as="h2" size="lg" mb={4}>
              Room {roomDescription.room.number} Description
            </Heading>

            <Stack direction="row" spacing={4} mb={4} >
             
                <Image src={`http://127.0.0.1:8000${roomDescription.sitting_room_image}`} alt="Sitting Room" boxSize="630px" w="900px" />

            <Stack direction="column" spacing={3} mb={4}>
                <Image src={`http://127.0.0.1:8000${roomDescription.bedroom_image}`} alt="Bedroom" boxSize="200px" />
                <Image src={`http://127.0.0.1:8000${roomDescription.kitchen_image}`} alt="Kitchen" boxSize="200px" />
                <Image src={`http://127.0.0.1:8000${roomDescription.bathroom_image}`} alt="Bathroom" boxSize="200px" />

            </Stack>
            
           
            </Stack>
            <Text mb={4}>
              Description: {roomDescription.description}
            </Text>
            <Text>
              Price: Ksh {roomDescription.price}
            </Text>
              <Button  mt={4} width="400px" bg="#0097b2" color="white"   _hover={{ bg: "#073d47" }}>
              Book Now
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomDescription;
