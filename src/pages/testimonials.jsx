import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import home3 from '../Components/Assetes/home3.jpg'; // Background image
import heroImage from '../Components/Assetes/home1.webp';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/testimonials/');
        const data = await response.json();
        setTestimonials(data); // Save testimonials data
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getNextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const getPreviousTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

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
            Testimonials
          </Heading>
    
        </Box>
      </Box>
   
    <Box
      id="testimonials"
      p={8}
      bgImage={`url(${home3})`} // Background image
      bgSize="cover"
      bgPosition="center"
      position="relative"
      minHeight="60vh"
    >
      <Box bg="rgba(0, 0, 0, 0.6)" p={8} borderRadius="md" boxShadow="lg" maxW="800px" mx="auto">
        <Heading as="h2" size="xl" mb={4} textAlign="center" color="white">
          Testimonials
        </Heading>
        <Text mb={4} textAlign="center" color="white">
          Hear what our clients have to say about our services.
        </Text>

        <Box overflow="hidden" position="relative">
          <AnimatePresence>
            {testimonials.length > 0 && (
              <motion.div
                key={testimonials[currentIndex]?.id}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{
                  type: 'tween',
                  ease: 'easeInOut',
                  duration: 0.6,
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                {/* Use requested image structure */}
                {testimonials[currentIndex]?.image && (
                  <Image
                    src={
                      testimonials[currentIndex].image.startsWith('/media/')
                        ? `http://127.0.0.1:8000${testimonials[currentIndex].image}`
                        : testimonials[currentIndex].image
                    }
                    borderRadius="full"
                    boxSize="120px"
                    objectFit="cover"
                    alt={`${testimonials[currentIndex]?.name}'s profile`}
                    mb={4}
                  />
                )}
                <Heading as="h3" size="md" fontWeight="bold" mb={2} color="gray.800">
                  {testimonials[currentIndex]?.name}
                </Heading>
                <Text maxW="400px" fontSize="sm" color="gray.600">
                  "{testimonials[currentIndex]?.text}"
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Flex justify="center" mt={4}>
          <IconButton
            aria-label="Previous"
            icon={<ChevronLeftIcon />}
            onClick={getPreviousTestimonial}
            colorScheme="teal"
            size="lg"
            mr={4}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={getNextTestimonial}
            colorScheme="teal"
            size="lg"
          />
        </Flex>

        <Flex justify="center" mt={4}>
          {testimonials.length > 0 &&
            testimonials.map((_, index) => (
              <Box
                key={index}
                as="span"
                width="10px"
                height="10px"
                borderRadius="50%"
                bg={currentIndex === index ? 'teal.500' : 'gray.300'}
                mx={2}
                cursor="pointer"
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </Flex>
      </Box>
    </Box>
     </Box>
  );
};

export default TestimonialsSection;
