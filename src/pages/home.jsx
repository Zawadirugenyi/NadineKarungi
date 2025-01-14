
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Box, Button, Heading, Grid,Text,Card, CardBody ,Image,
         Accordion, SimpleGrid, AccordionItem, AccordionButton, 
         AccordionPanel, AccordionIcon,  Flex,IconButton , Stack} from '@chakra-ui/react';
import backgroundImage1 from '../Components/Assetes/home1.webp';
import backgroundImage2 from '../Components/Assetes/111.webp';
import backgroundImage3 from '../Components/Assetes/home3.jpg';
import aboutImage from '../Components/Assetes/Gerante1.jpeg'
import backgroundImage4 from '../Components/Assetes/1113.jpeg';
import { FaWhatsapp } from 'react-icons/fa'; 
import { useTranslation } from 'react-i18next'; 
import backgroundImage from '../Components/Assetes/home3.jpg'; 
import home3 from '../Components/Assetes/home2.jpg'; 
import { Input, Textarea,  FormControl, FormLabel } from '@chakra-ui/react';
import contactImage from '../Components/Assetes/Equipe.jpeg'; 


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      <div className="language-switcher">
        <button onClick={() => handleLanguageChange('en')}>
          <img src="/path/to/english-flag.png" alt="English" style={{ width: '30px', height: '20px' }} />
        </button>
        <button onClick={() => handleLanguageChange('fr')}>
          <img src="/path/to/french-flag.png" alt="French" style={{ width: '30px', height: '20px' }} />
        </button>
        <button onClick={() => handleLanguageChange('sw')}>
          <img src="/path/to/swahili-flag.png" alt="Swahili" style={{ width: '30px', height: '20px' }} />
        </button>
      </div>
    </div>
  );
};

const phoneNumber = '243820937002'; 
const HomePage = () => {
    const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/services/');
        setServices(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch services. Please try again.');
      }
    };

    fetchServices();
  }, []);
  

   const [promotions, setPromotions] = useState([]);
 

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/promotions/'); // Adjust endpoint as needed
        setPromotions(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching promotions:', err);
        setError('Failed to fetch promotions. Please try again.');
      }
    };

    fetchPromotions();
  }, []);

  const [activities, setActivities] = useState([]);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/activities/'); // Adjust endpoint as needed
        setActivities(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to fetch activities. Please try again.');
      }
    };

    fetchActivities();
  }, []);


 const [jobs, setJobs] = useState([]);
 
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/jobinternships/'); // Adjust the endpoint if needed
        setJobs(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again.');
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
    // You can add logic here to navigate to an application form or submit a request.
  };




    const [testimonials, setTestimonials] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://microtousadmin.onrender.com/api/testimonials/');
        setTestimonials(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to fetch testimonials. Please try again.');
      }
    };

    fetchTestimonials();
  }, []);

  // Automatic slideshow every 5 seconds with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [testimonials.length]);

  const getNextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const getPreviousTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };


   const [teamMembers, setTeamMembers] = useState([]); // State to hold fetched data

  useEffect(() => {
    // Fetch team members data
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://microtousadmin.onrender.com/api/team_members/');
        const data = await response.json();
        setTeamMembers(data); // Set the fetched data to the state
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Box
        w="100vw"
        h="50vh" // Reduced height for a smaller Hero section
        overflow="hidden"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          width="300%"
          position="absolute"
          top="0"
          left="0"
          transform="translateX(0)"
          transition="transform 1s ease-in-out"
        >
          <Box
            width="100vw"
            height="60vh" // Reduced height
            backgroundImage={`url(${backgroundImage1})`}
            backgroundSize="cover"
            backgroundPosition="center"
            flex="none"
          />
          <Box
            width="100vw"
            height="60vh" // Reduced height
            backgroundImage={`url(${backgroundImage2})`}
            backgroundSize="cover"
            backgroundPosition="center"
            flex="none"
          />
          <Box
            width="100vw"
            height="60vh" // Reduced height
            backgroundImage={`url(${backgroundImage3})`}
            backgroundSize="cover"
            backgroundPosition="center"
            flex="none"
          />
        </Box>

        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.5)"
        />
        <Box zIndex="2" textAlign="center" px={4} py={{ base: 8, md: 16 }}>
          <Heading
            color="white"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight="bold"
            mb={4}
            mt="-10px"
           
          >
            Bienvenu chez nous
          </Heading>
         
         
        </Box>
      </Box>

      {/* About Us Section */}
   <Box id="about-us" p={8} bg="gray.100">
      <Grid
        templateColumns={{
          base: '1fr', // Single column on smaller screens
          md: '1fr 1fr', // Two columns on medium and larger screens
        }}
        gap={8}
        alignItems="center"
      >
        {/* Image Card */}
        <Box
     
        >
          <img
            src={aboutImage}
            alt="About Us"
            style={{
              width: '98%',
              height: '87vh',
              objectFit: 'cover',
              borderRadius: '8px', // Add rounded corners like the text card
            }}
          />
        </Box>

        {/* Content Card */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          p={8}
          height="70vh" // Let the content height adjust based on text
        >
          <Heading as="h2" size="xl" mb={4}>
            About Us
          </Heading>
          <Text mb={4} fontSize="lg">
            We are a leading company with a mission to revolutionize the industry. Our team of professionals is dedicated to providing top-notch services to our clients. With years of experience in the field, we strive to deliver innovative solutions tailored to meet the unique needs of each client. Our company is committed to excellence, and we pride ourselves on our customer-centric approach.
          </Text>
          <Text mb={4} fontSize="lg">
            Our diverse team includes experts from various industries, ensuring that we bring the best ideas and strategies to the table. We understand the challenges that our clients face, and we work tirelessly to provide them with solutions that not only address their immediate needs but also position them for long-term success. Whether you're looking for cutting-edge technology or a reliable partner for your business, we are here to help you achieve your goals.
          </Text>
               <Button  
                color="#2a8fc1"
              size="lg"
              _hover={{ bg: 'yellow.200' }}
              px={8}
              as="a"
              href="/about_us"
              mt="10px">
                  Learn More 
                </Button>
         
        
       
        </Box>
      </Grid>
    </Box>
      {/* Services Section */}
      <Box
      id="services"
      p={8}
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPos="center"
      color="white"
     
    >
 
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Our Services
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}
      <Box
        p={6}
        bg="rgba(0, 0, 0, 0.6)"
        borderRadius="lg"
        boxShadow="lg"
        maxW="1300px"
        mx="auto"
      >
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6}>
          {services.map((service, index) => (
            <Card key={index} bg="white" color="black" boxShadow="md" borderRadius="md">
              <CardBody>
                <Heading as="h3" size="md" mb={4}>
                  {service.name}
                </Heading>
                <Text mb={4}>{service.description}</Text>
          
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Box>
    </Box>

      {/* Promotions Section */}
      <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh" // Adjust height to fit content
     
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
        <Button  
                color="#2a8fc1"
              size="lg"
              _hover={{ bg: 'yellow.200' }}
              px={8}
              as="a"
              href="home"
              mt="10px"
              marginTop="30px">
                
          Read More
        </Button>
      </Box>
    </Flex>


      {/* Activities Section */}

         <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh" // Adjust height to fit content
    
      bgSize="cover" // Ensure the image covers the section
      bgPosition="center" // Center the image
      p={4}

    >
      <Box
          bg="white"
        borderRadius="md"
       
        p={8}
        width={{ base: '100%', md: '95%', lg: '100%' }} // Adjust width based on screen size
        textAlign="center" 
      >
        <Heading as="h2" size="xl" mb={4}>
          Activities
        </Heading>
        <Text mb={4}>
          Discover the various activities we organize to engage our clients and the community.
        </Text>

        {/* Render the activities */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={8} mt={8}>
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
                <Heading as="h3" size="md" mb={2}>
                  {activity.name}
                </Heading>

                {/* Description */}
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {activity.description}
                </Text>

                {/* Activity Date, Time, and Venue */}
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Date: {activity.date} | Time: {activity.start_hour} - {activity.end_hour} | Venue: {activity.venue}
                </Text>

                {/* Button to redirect */}
              
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Flex>


      {/* Jobs & Internships Section */}
     <Box id="jobs" p={8} bg="gray.100">
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Jobs & Internships
      </Heading>
      <Text mb={4} textAlign="center">
        Join our team! We are always looking for talented individuals to help us grow.
      </Text>
      {error && <Text color="red.500" mb={4}>{error}</Text>}

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }} gap={6}>
        {jobs.map((job, index) => (
          <Card key={index} bg="white" boxShadow="md" borderRadius="md">
            <CardBody>
              <Stack spacing={4}>
                <Heading as="h3" size="md">
                  {job.title}
                </Heading>
                <Text>{job.description}</Text>
                <Button         
                color="#2a8fc1"
              size="lg"
              _hover={{ bg: 'yellow.200' }}
              px={8}
              as="a"
              href="application"
              mt="10px"
                onClick={() => handleApply(job.id)}>
                  Apply Now
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>

      {/* Testimonials Section */}
 <Box
      id="testimonials"
      p={8}
      bgImage={`url(${backgroundImage4})`} // Background image
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
            color="#2a8fc1"
            size="lg"
            mr={4}
          />
          <IconButton
            aria-label="Next"
            icon={<ChevronRightIcon />}
            onClick={getNextTestimonial}
            color="#2a8fc1"
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
                bg={currentIndex === index ? '#2a8fc1' : 'gray.300'}
                mx={2}
                cursor="pointer"
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </Flex>
      </Box>
    </Box>

      {/* FAQs Section */}
  <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      bg="gray.100"
      p={4}
    >
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        width="80%"
        maxWidth="800px"
        textAlign="left"
      >
        <Heading as="h2" size="xl" mb={4}>
          Frequently Asked Questions (FAQs)
        </Heading>
        <Text mb={4}>
          Find answers to the most common questions regarding our banking services, accounts, loans, and more.
        </Text>

        {/* Accordion for Banking FAQ */}
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I open a bank account?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can open a bank account online through our website or by visiting any of our branches. You'll need a valid ID, proof of address, and an initial deposit.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What types of bank accounts do you offer?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              We offer various types of bank accounts, including savings accounts, current accounts, and fixed deposits. Each account type has its own benefits, and you can choose one based on your financial needs.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How can I apply for a loan?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              You can apply for a loan by visiting our branch or by filling out an online application form. Depending on the type of loan, we may require proof of income and credit history.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  How do I reset my online banking password?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              To reset your online banking password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  What is the interest rate on savings accounts?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Our savings accounts offer competitive interest rates that vary depending on the account type and balance. Please visit our interest rates page for the most up-to-date information.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Can I access my account from anywhere in the world?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Yes, you can access your account from anywhere in the world using our online banking platform. Simply log in with your credentials, and you can manage your account from any device with an internet connection.
            </AccordionPanel>
          </AccordionItem>

          {/* Add more AccordionItems as needed */}
        </Accordion>

        {/* Read More Button */}
      
      </Box>
    </Flex>

    
      {/* Team Section */}
      
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
                src={member.image} // Team member photo
                borderRadius="full"
                boxSize="120px"
                margin="40px"
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

      {/* Contact Section */}
      
<Box id="about-us" p={8} bg="gray.100">
      <Flex 
        id="contact" 
        p={8} 
        bg="gray.100" 
        justifyContent="center" 
        alignItems="center" 
        flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on small screens and horizontally on larger screens
        minHeight="80vh"
      >
        {/* Contact Form Card */}
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={8}
          width={{ base: '100%', md: '50%' }}
          mr={{ base: 0, md: 8 }}
          mb={{ base: 8, md: 0 }}
        >
          <Heading as="h2" size="xl" mb={4}>
            Contact Us
          </Heading>
          <form>
            <FormControl id="full-name" mb={4} isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" placeholder="Enter your full name" />
            </FormControl>

            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>

            <FormControl id="message" mb={4} isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Write your message here" />
            </FormControl>

                 <Button

                           
        color="#2a8fc1"
        size="lg"
        _hover={{ bg: 'yellow.200' }}
        px={8}
        as="a"
        href="home"
        mt="10px"
                           
                           >
            Submit Application
          </Button>
     
          </form>
          
        </Box>


  
        {/* Image on the Right */}
        <Box
          flexShrink={0}
          width={{ base: '100%', md: '50%' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={{ base: 8, md: 0 }} // Add margin-top for small screens
        >
          <img
            src={contactImage} 
            alt="About Us"
            style={{
              width: '92%',
              height: '60vh',
              objectFit: 'cover',
              borderRadius: '8px', // Add rounded corners like the text card
            }}
          />
        </Box>
      </Flex>
    </Box>



      {/* Footer or Other Sections */}
    
    <Flex 
  id="map" 
  p={8} 
  bg="white" 
  justifyContent="center" 
  alignItems="center" 
  minHeight="60vh"
  flexDirection="column"
>
  <Heading as="h2" size="xl" mb={4}>
    Our Location
  </Heading>

  <Box 
    position="relative" 
    width={{ base: '100%', md: '80%' }} 
    height="400px" 
    border="2px solid teal" 
    borderRadius="md" 
    overflow="hidden"
  >
    {/* Clickable overlay */}
    <a 
      href="https://www.google.com/maps/place/H67R+JCF,+Bunia" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 10, 
        cursor: 'pointer' 
      }}
    ></a>

    {/* Embedded Google Map */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3988.3318402502914!2d30.238472!3d1.5640625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17642b5e630902fd%3A0x8b261e95f84ac109!2sH67R%2BJCF%2C%20Bunia!5e0!3m2!1sen!2scd!4v1736498502843!5m2!1sen!2scd"
      width="100%" 
      height="100%" 
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </Box>
</Flex>



 <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <IconButton
        as="a"
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        icon={<FaWhatsapp />}
        size="lg"
        bg="#2a8fc1"// Optional, for styling the button
        borderRadius="full" // Optional, to make it circular
        boxShadow="lg"
        marginTop="-120px"
        _hover={{ color: '#f7e135' }}
      />
    </div>

    </>
  );
};

export default HomePage;
