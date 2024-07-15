import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HostelCard({ id, name, address, image }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Image src={image} alt={`${name}_image`} borderRadius="md" mb={4} />
      <Text fontSize="xl" fontWeight="bold">{name}</Text>
      <Text>{address}</Text>
      <Button as={Link} to={`/room/${encodeURIComponent(name)}`} bg="#0097b2"  _hover={{ bg: "#073d47" }} mt={4}>
        View Rooms
      </Button>
    </Box>
  );
}

export default HostelCard;
