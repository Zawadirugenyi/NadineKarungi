import React from 'react';
import { Box, Image, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HostelCard({ id, name, address, image }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="sm">
      <Flex direction="column">
        <Image src={image} alt={`${name}_image`} borderRadius="md" mb={4} />
        <Text fontSize="xl" fontWeight="bold">{name}</Text>
        <Text>{address}</Text>
      </Flex>
      <Flex justify="flex-end" mt={4} marginTop="-42px">
        <Button as={Link} to={`/room/${encodeURIComponent(name)}`}   
           bg="white"
          color="#0097b2"
          border="1px solid #0097b2"
          boxShadow="md"
          _hover={{ bg: "#0097b2", color: "white" }}
          textDecoration="none">
          View Rooms
        </Button>
      </Flex>
    </Box>
  );
}

export default HostelCard;
