import React, { useRef, useState } from 'react';
import { Box, Heading, Button, Stack, Input, Textarea, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import contactImage from '../Components/Assetes/Equipe.jpeg';  // Correction du chemin pour la cohérence
import heroImage from '../Components/Assetes/home1.webp';    // Correction du chemin pour la cohérence
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
       setErrorMessage(null); // Réinitialiser le message d'erreur à chaque tentative d'envoi

       emailjs
           .sendForm('service_u249j16', 'template_sty9mnt', form.current, 'YnzlhG7bfYsDDM0vz') // Remplacer par votre clé publique
           .then(
               () => {
                   setIsSubmitting(false);
                   setIsSubmitted(true);
                   setFormData({ from_name: '', user_email: '', message: '' });
                   setTimeout(() => setIsSubmitted(false), 5000); // Masquer le message de succès après 5 secondes
               },
               (error) => {
                   console.log('ÉCHEC...', error.text);
                   setIsSubmitting(false);
                   setErrorMessage("Il y a eu un problème lors de l'envoi de votre message. Veuillez réessayer plus tard.");
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
                   bg="rgba(0, 0, 0, 0.6)" // Superposition sombre pour une meilleure lisibilité du texte
               />
               <Box zIndex="1" textAlign="center" color="white" p={8}>
                   <Heading as="h1" size="2xl" mb={4}>
                       Contactez-nous
                   </Heading>
               </Box>
           </Box>

           <Flex 
               id="contact" 
               p={8} 
               bg="gray.100" 
               justifyContent="center" 
               alignItems="center" 
               flexDirection={{ base: 'column', md: 'row' }} // Empilement vertical sur petits écrans et horizontal sur grands écrans
               minHeight="80vh"
           >
               {/* Carte du formulaire de contact */}
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
                       Contactez-nous
                   </Heading>
                   <form ref={form} onSubmit={sendEmail}>
                       <Stack spacing={4}>
                           <FormControl id="name" isRequired>
                               <FormLabel>Nom</FormLabel>
                               <Input
                                   name="user_name"
                                   placeholder="Votre nom"
                                   value={formData.from_name}
                                   onChange={handleChange}
                               />
                           </FormControl>
                           <FormControl id="email" isRequired>
                               <FormLabel>Email</FormLabel>
                               <Input
                                   type="email"
                                   name="user_email"
                                   placeholder="Votre email"
                                   value={formData.user_email}
                                   onChange={handleChange}
                               />
                           </FormControl>
                           <FormControl id="message" isRequired>
                               <FormLabel>Message</FormLabel>
                               <Textarea
                                   name="message"
                                   placeholder="Votre message"
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
                               Envoyer le message
                           </Button>
                           {isSubmitted && !errorMessage && (
                               <Text color="green.500" mt={2}>
                                   Merci pour votre message ! Nous reviendrons vers vous bientôt.
                               </Text>
                           )}
                       </Stack>
                   </form>
               </Box>

               {/* Image à droite */}
               <Box
                   flexShrink={0}
                   width={{ base: '100%', md: '50%' }}
                   display="flex"
                   justifyContent="center"
                   alignItems="center"
                   mt={{ base: 8, md: 0 }} // Ajouter une marge supérieure pour les petits écrans
               >
                   <img
                       src={contactImage} 
                       alt="À propos de nous"
                       style={{
                           width: '92%',
                           height: '60vh',
                           objectFit: 'cover',
                           borderRadius: '8px', // Ajouter des coins arrondis comme pour la carte de texte
                       }}
                   />
               </Box>
           </Flex>
       </Box>
   );
};

export default ContactSection;
