import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Image, SimpleGrid } from '@chakra-ui/react';
import home3 from '../Components/Assetes/home3.jpg'; // Import the background image
import heroImage from '../Components/Assetes/home1.webp';



const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]); // State to hold fetched data

  useEffect(() => {
    // Fetch team members data
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/team_members/');
        const data = await response.json();
        setTeamMembers(data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers(); // Fetch data when the component mounts
  }, []);

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
            Teams
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
          Our Team
        </Heading>
        <Text mb={4}>
          Meet the brilliant minds behind our success. Our team is the backbone of our business.
        </Text>

        {/* Render the team members */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={8} mt={8}>
          {teamMembers.map((member) => (
            <Box
              key={member.id}
              bg="white"
              p={6}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              {/* Display team member's photo */}
              <Image
                src={member.image } // Team member photo
                borderRadius="full"
                boxSize="120px"
                objectFit="cover"
                mb={4}
              />
              <Heading as="h3" size="md" mb={2}>
                {member.name}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {member.role}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Read More Button */}
       
      </Box>
    </Flex>
    </Box>
  );
};

export default TeamSection;
