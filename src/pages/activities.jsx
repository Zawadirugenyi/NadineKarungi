import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import the background image
import heroImage from '../Components/Assetes/home1.webp';

const ActivitiesSection = () => {
  const [activities, setActivities] = useState([]); // State to hold fetched data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch activities data
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/activities/');
        const data = await response.json();
        setActivities(data); // Set the fetched data to the state
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchActivities(); // Fetch data when the component mounts
  }, []);

  if (isLoading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>;
  }

  return (
    <Box>
        <Box
        w="100vw"
        h="40vh"
        bgImage={`url(${heroImage})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        m={0}
        p={0}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.6)" // Dark overlay for better text readability
        />
        <Box zIndex="1" textAlign="center" color="white" p={8}>
          <Heading as="h1" size="2xl" mb={4}>
          Activities
          </Heading>
    
        </Box>
      </Box>
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh" // Adjust height to fit content
      bgImage={`url(${home3})`} // Background image
      bgSize="cover" // Ensure the image covers the section
      bgPosition="center" // Center the image
      p={4}
      backgroundBlendMode="overlay" // Overlay effect to darken the image
      backgroundColor="rgba(0, 0, 0, 0.5)" // Darken the background for better text contrast
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        width={{ base: '100%', md: '95%', lg: '80%' }} // Adjust width for different screen sizes
        textAlign="center" // Center text horizontally
      >
        <Heading as="h2" size="xl" mb={4}>
          Activities
        </Heading>
        <Text mb={4} fontSize={{ base: 'md', md: 'lg' }}>
          Discover the various activities we organize to engage our clients and the community.
        </Text>

        {/* Render the activities */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={{ base: 4, md: 6 }} mt={8}>
          {activities.map((activity) => {
            const imageUrl = activity.image && activity.image.startsWith('/media/')
              ? `http://127.0.0.1:8000${activity.image}`
              : activity.image;

            return (
              <Box
                key={activity.id}
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                textAlign="center"
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }} // Hover effect for card
              >
                {/* Conditionally render the image if URL is provided */}
                {activity.image && (
                  <Image
                    src={imageUrl}
                    alt={activity.name}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    width="100%"
                    height={{ base: '200px', md: '250px' }} // Adjust height for responsive design
                    fallbackSrc="https://via.placeholder.com/150" // Use a fallback image in case of broken URL or loading failure
                  />
                )}

                {/* Title */}
                <Heading as="h3" size="md" mb={2} fontSize={{ base: 'lg', md: 'xl' }}>
                  {activity.name}
                </Heading>

                {/* Description */}
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" mb={4}>
                  {activity.description}
                </Text>

                {/* Activity Date, Time, and Venue */}
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" mb={4}>
                  Date: {activity.date} | Time: {activity.start_hour} - {activity.end_hour} | Venue: {activity.venue}
                </Text>

                {/* Button to redirect */}
              
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Flex>
    </Box>
  );
};

export default ActivitiesSection;
