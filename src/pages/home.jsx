import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid } from '@chakra-ui/react';
import HostelCard from '../Components/hostel_card';

function Home() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const token = 'b17ecd1e7ab8b13a1c98c81fefad7c8839252b63'; // Replace with your actual token
        const response = await fetch('http://127.0.0.1:8000/api/hostels/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setHostels(data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  return (
    <Box p={4}>
      <Heading mb={6}>Hostels</Heading>
      <Grid 
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} 
        gap={4}
      >
        {hostels.map((hostel, index) => (
          <HostelCard
            key={index}
            id={hostel.id}
            name={hostel.name}
            address={hostel.address}
            image={`http://127.0.0.1:8000${hostel.image}`} // Construct the correct URL
          />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
