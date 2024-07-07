import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

function HostelCard({ name, address, image }) {
  console.log('Image URL:', image); 

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Image src={image} alt="Hostel Image" borderRadius="md" mb={4} /> {/* Use 'image' prop here */}
      <Text fontSize="xl" fontWeight="bold">{name}</Text>
      <Text>{address}</Text>
    </Box>
  );
}

export default HostelCard;
