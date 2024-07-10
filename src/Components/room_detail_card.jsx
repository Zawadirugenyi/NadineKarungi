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

const RoomDetail = ({ roomDescription }) => {
  const { room, sitting_room_image, bedroom_image, kitchen_image, bathroom_image, description, price } = roomDescription;

  return (
    <Box p={6} bg="gray.100" boxShadow="lg" borderRadius="md">
      <VStack align="start" spacing={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex="1">
          {sitting_room_image && (
            <Image src={`http://127.0.0.1:8000${sitting_room_image}`} alt={`Sitting room of ${room.number}`} maxH="300px" objectFit="cover" borderRadius="md" />
          )}
          {bedroom_image && (
            <Image src={`http://127.0.0.1:8000${bedroom_image}`} alt={`Bedroom of ${room.number}`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
          )}
          {kitchen_image && (
            <Image src={`http://127.0.0.1:8000${kitchen_image}`} alt={`Kitchen of ${room.number}`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
          )}
          {bathroom_image && (
            <Image src={`http://127.0.0.1:8000${bathroom_image}`} alt={`Bathroom of ${room.number}`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
          )}
        </Box>
        <Spacer />
        <Box flex="1" ml={{ base: 0, md: 4 }}>
          <Heading mb={4}>{room.number}</Heading>
          <Text mb={4}>Room Type: {room.room_type}</Text>
          <Text mb={4}>Hostel: {room.hostel.name}</Text>
          <Text mb={4}>Price: ${price} per night</Text>
          <Text mb={4}>Description: {description}</Text>
          <Center>
            <Button colorScheme="teal" mt={4} width="full">
              Book Now
            </Button>
          </Center>
        </Box>
      </VStack>
    </Box>
  );
};

export default RoomDetail;
