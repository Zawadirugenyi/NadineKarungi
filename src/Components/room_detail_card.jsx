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
          <Image src={sitting_room_image} alt={`Image of ${room.number} sitting room`} maxH="300px" objectFit="cover" borderRadius="md" />
          <Image src={bedroom_image} alt={`Image of ${room.number} bedroom`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
          <Image src={kitchen_image} alt={`Image of ${room.number} kitchen`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
          <Image src={bathroom_image} alt={`Image of ${room.number} bathroom`} maxH="300px" objectFit="cover" borderRadius="md" mt={4} />
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
