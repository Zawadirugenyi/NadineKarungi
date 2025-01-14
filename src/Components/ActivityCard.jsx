// ActivityCard.js
import React from 'react';
import { Box, Text, Image, Stack, Flex } from '@chakra-ui/react';

const ActivityCard = ({ activity }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      width="400px"
      overflow="hidden"
      p={3}
      bg="white"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      <Flex direction="column" height="100%">
        {/* Activity Image */}
        {activity.photo && (
          <Image
            src={`http://127.0.0.1:8000/media${activity.photo}`} // Adjusted image URL
            alt={`${activity.name}_image`}
            borderRadius="md"
            mb={3}
            objectFit="cover"
            width="100%"
            height="200px" // Adjusted image height
          />
        )}

        {/* Activity Name */}
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {activity.name}
        </Text>

        {/* Activity Description */}
        <Text fontSize="sm" mb={3}>
          {activity.description}
        </Text>

        {/* Activity Date, Time, and Venue */}
        <Stack spacing={2}>
          <Stack direction="row" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">Date:</Text>
            <Text fontSize="sm">{activity.date}</Text>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">Start Time:</Text>
            <Text fontSize="sm">{activity.start_hour}</Text>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">End Time:</Text>
            <Text fontSize="sm">{activity.end_hour}</Text>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Text fontWeight="bold" fontSize="sm">Venue:</Text>
            <Text fontSize="sm">{activity.venue}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ActivityCard;
