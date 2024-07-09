import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  Spacer,
  Center,
} from '@chakra-ui/react';

// Assuming you have a prop for room data passed to this component
const RoomDetail = ({ room }) => {
  return (
    <Box p={6} bg="gray.100" boxShadow="lg" borderRadius="md">
      <VStack align="start" spacing={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex="1">
          <Image src={room.image} alt={`Image of ${room.number}`} maxH="300px" objectFit="cover" borderRadius="md" />
        </Box>
        <Spacer />
        <Box flex="1" ml={{ base: 0, md: 4 }}>
          <Heading mb={4}>{room.number}</Heading>
          <Text mb={4}>Room Type: {room.room_type}</Text>
          <Text mb={4}>Hostel: {room.hostel.name}</Text>
          <Text mb={4}>Price: ${room.price} per night</Text>
          <Text mb={4}>Description: {room.description}</Text>
          <Center>
            <Button colorScheme="teal" mt={4} width="full">
              Book Now
            </Button>
          </Center>
        </Box>
      </VStack>
    </Box>
  );
}

export default RoomDetail;
