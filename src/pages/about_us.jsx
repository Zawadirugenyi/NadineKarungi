import React from 'react';
import { Box, Grid, Heading, Text, Button } from '@chakra-ui/react';
import heroImage from '../Components/Assetes/home2.jpg'; // Replace with your actual image path

const AboutUsSection = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        w="100vw"
        h="50vh"
        bgImage={`url(${heroImage})`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        borderRadius="none"
        m={0} // Remove margins
        p={0} // Remove paddings
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
            About Us
          </Heading>
       
        </Box>
      </Box>

      {/* About Us Section */}
      <Box id="about-us" p={8} bg="gray.100">
        {/* Main Card */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          p={8}
          mb={8} // Margin to separate from other sections
        >
          <Heading as="h2" size="xl" mb={8} textAlign="center"    color="#2a8fc1">
            Who Are We?
          </Heading>

          {/* Grid of Three Cards */}
          <Grid
            templateColumns={{
              base: '1fr', // Single column on smaller screens
              md: '1fr 1fr 1fr', // Three columns on medium and larger screens
            }}
            gap={8}
            alignItems="stretch"
          >
            {/* Who Are We Card */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Who Are We?
              </Heading>
              <Text mb={4} fontSize="lg">
                We are a leading company with a mission to revolutionize the industry. Our team of professionals is dedicated to providing top-notch services to our clients. With years of experience in the field, we strive to deliver innovative solutions tailored to meet the unique needs of each client.
              </Text>
            </Box>

            {/* Mission Card */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Our Mission
              </Heading>
              <Text mb={4} fontSize="lg">
                Our mission is to empower businesses by providing them with innovative solutions that simplify their operations and improve efficiency. We aim to be a reliable partner for every client, helping them reach their goals and achieve sustainable success.
              </Text>
            </Box>

            {/* Vision Card */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              p={8}
              height="auto"
            >
              <Heading as="h3" size="lg" mb={4}>
                Our Vision
              </Heading>
              <Text mb={4} fontSize="lg">
                Our vision is to be a global leader in our industry, providing exceptional services that drive progress and foster long-term relationships. We strive to be a company known for its innovation, reliability, and commitment to customer satisfaction.
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AboutUsSection;
