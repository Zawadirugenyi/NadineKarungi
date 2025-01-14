import React, { useRef, useState } from 'react';
import { Box, Heading, Button, Stack, Input, Textarea, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import contactImage from '../Components/Assetes/Equipe.jpeg';  // Corrected the path for consistency
import heroImage from '../Components/Assetes/home1.webp';    // Corrected the path for consistency
import emailjs from '@emailjs/browser';

const ContactSection = () => {
   const form = useRef();
   const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);

   const sendEmail = (e) => {
       e.preventDefault();
       setIsSubmitting(true);
       setErrorMessage(null); // Reset error message on each submission attempt

       emailjs
           .sendForm('service_u249j16', 'template_sty9mnt', form.current, 'YnzlhG7bfYsDDM0vz') // Replace with your public key
           .then(
               () => {
                   setIsSubmitting(false);
                   setIsSubmitted(true);
                   setFormData({ from_name: '', user_email: '', message: '' });
                   setTimeout(() => setIsSubmitted(false), 5000); // Hide success message after 5 seconds
               },
               (error) => {
                   console.log('FAILED...', error.text);
                   setIsSubmitting(false);
                   setErrorMessage("There was an issue sending your message. Please try again later.");
               }
           );
   };

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
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
                       Contact Us
                   </Heading>
               </Box>
           </Box>

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
                   <form ref={form} onSubmit={sendEmail}>
                       <Stack spacing={4}>
                           <FormControl id="name" isRequired>
                               <FormLabel>Name</FormLabel>
                               <Input
                                   name="user_name"
                                   placeholder="Your Name"
                                   value={formData.from_name}
                                   onChange={handleChange}
                               />
                           </FormControl>
                           <FormControl id="email" isRequired>
                               <FormLabel>Email</FormLabel>
                               <Input
                                   type="email"
                                   name="user_email"
                                   placeholder="Your Email"
                                   value={formData.user_email}
                                   onChange={handleChange}
                               />
                           </FormControl>
                           <FormControl id="message" isRequired>
                               <FormLabel>Message</FormLabel>
                               <Textarea
                                   name="message"
                                   placeholder="Your Message"
                                   value={formData.message}
                                   onChange={handleChange}
                               />
                           </FormControl>
                           {errorMessage && (
                               <Text color="red.500" mt={2}>
                                   {errorMessage}
                               </Text>
                           )}
                           <Button
                              
                            color="#2a8fc1"
                            size="lg"
                            _hover={{ bg: 'yellow.200' }}
                            px={8}
                            as="a"
                            href="services"
                            mt="10px"
                            isLoading={isSubmitting}
                           >
                               Send Message
                           </Button>
                           {isSubmitted && !errorMessage && (
                               <Text color="green.500" mt={2}>
                                   Thank you for your message! We'll get back to you soon.
                               </Text>
                           )}
                       </Stack>
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
   );
};

export default ContactSection;
