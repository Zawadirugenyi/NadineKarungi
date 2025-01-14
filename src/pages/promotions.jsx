import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import the background image
import heroImage from '../Components/Assetes/home1.webp';

const PromotionsSection = () => {
  const [promotions, setPromotions] = useState([]); // State to hold fetched data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch promotions data
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/promotions/');
        const data = await response.json();
        setPromotions(data); // Set the fetched data to the state
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching promotions:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPromotions(); // Fetch data when the component mounts
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
            Promotions
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
        width={{ base: '100%', md: '95%', lg: '100%' }} // Adjust width based on screen size
        textAlign="center" // Center text horizontally
      >
        <Heading as="h2" size="xl" mb={4}>
          Promotions
        </Heading>
        <Text mb={4}>
          Check out our latest promotions and special offers.
        </Text>

        {/* Render the promotions */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={8} mt={8}>
          {promotions.map((promotion) => {
            const imageUrl = promotion.image && promotion.image.startsWith('/media/')
              ? `http://127.0.0.1:8000${promotion.image}`
              : promotion.image;

            return (
              <Box
                key={promotion.id}
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                textAlign="center"
              >
                {/* Conditionally render the image if URL is provided */}
                {promotion.image && (
                  <Image
                    src={imageUrl}
                    alt={promotion.title}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    width="100%"
                    height={{ base: '200px', md: '250px' }} // Adjust height for responsive design
                    fallbackSrc="https://via.placeholder.com/150" // Use a fallback image in case of broken URL or loading failure
                  />
                )}

                {/* Title */}
                <Heading as="h3" size="md" mb={2}>
                  {promotion.title}
                </Heading>

                {/* Description */}
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {promotion.description}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Read More Button */}
        <Button as="a" href="#read-more-promotions" colorScheme="teal" _hover={{ bg: 'teal.500' }} mt={8}>
          Read More
        </Button>
      </Box>
    </Flex>
    </Box>
  );
};

export default PromotionsSection;
