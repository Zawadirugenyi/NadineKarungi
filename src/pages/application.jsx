import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Select, 
  useToast, 
  Grid, 
  Text, 
  Flex, 
  Image 
} from '@chakra-ui/react';
import useSubmitApplication from '../Components/useSubmitApplication';
import aboutImage from '../Components/Assetes/Gerante1.jpeg'; // Chemin corrigé pour l'importation de l'image

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    place: '',
    nationality: '',
    sex: '',
    cv: null,
    cover_letter: null,
    other_documents: null,
    years_of_experience: '',
    starting_date: '',
  });

  const { submitApplication, loading } = useSubmitApplication(); // Utilisation du hook pour la soumission
  const toast = useToast();

  // Gérer les changements de texte dans les champs de saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gérer les changements de fichiers dans les champs de saisie de fichier
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0], // Stocker le premier fichier sélectionné
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(formData);
      
      // Réinitialiser les données du formulaire après une soumission réussie
      setFormData({
        full_name: '',
        email: '',
        place: '',
        nationality: '',
        sex: '',
        cv: null,
        cover_letter: null,
        other_documents: null,
        years_of_experience: '',
        starting_date: '',
      });

      toast({
        title: 'Candidature soumise.',
        description: 'Votre candidature a été soumise avec succès !',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // La gestion des erreurs se fait dans le hook personnalisé
    }
  };

  return (
    <Flex 
      direction={['column', 'column', 'row']} 
      p={6} 
      maxW="1200px" 
      mx="auto" 
      mt={10} 
      borderRadius="md" 
      boxShadow="lg" 
      bg="white"
    >
      <Box flex="1" p={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Formulaire de Candidature
        </Text>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={['1fr', '1fr 1fr']} gap={6}>
            <FormControl isRequired>
              <FormLabel htmlFor="full_name">Nom Complet</FormLabel>
              <Input 
                id="full_name" 
                name="full_name" 
                value={formData.full_name} 
                onChange={handleChange} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="place">Lieu</FormLabel>
              <Input 
                id="place" 
                name="place" 
                value={formData.place} 
                onChange={handleChange} 
                placeholder="Bunia, RDC" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="nationality">Nationalité</FormLabel>
              <Select 
                id="nationality" 
                name="nationality" 
                value={formData.nationality} 
                onChange={handleChange} 
                placeholder="Sélectionner la nationalité"
              >
                <option value="congolese">Congolaise</option>
                <option value="kenyan">Kényane</option>
                <option value="rwandan">Rwandaise</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="sex">Sexe</FormLabel>
              <Select 
                id="sex" 
                name="sex" 
                value={formData.sex} 
                onChange={handleChange} 
                placeholder="Sélectionner le sexe"
              >
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="cv">CV</FormLabel>
              <Input 
                id="cv" 
                name="cv" 
                type="file" 
                onChange={handleFileChange} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="cover_letter">Lettre de Motivation</FormLabel>
              <Input 
                id="cover_letter" 
                name="cover_letter" 
                type="file" 
                onChange={handleFileChange} 
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="other_documents">Autres Documents</FormLabel>
              <Input 
                id="other_documents" 
                name="other_documents" 
                type="file" 
                onChange={handleFileChange} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="years_of_experience">Années d'Expérience</FormLabel>
              <Select 
                id="years_of_experience" 
                name="years_of_experience" 
                value={formData.years_of_experience} 
                onChange={handleChange} 
                placeholder="Sélectionner le niveau d'expérience"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="starting_date">Date de Début</FormLabel>
              <Input 
                id="starting_date" 
                name="starting_date" 
                type="date" 
                value={formData.starting_date} 
                onChange={handleChange} 
              />
            </FormControl>
          </Grid>
          <Button 
            mt={6} 
            color="#2a8fc1"
            size="lg"
            _hover={{ bg: 'yellow.200' }}
            isLoading={loading} 
            type="submit"
          >
            Soumettre
          </Button>
        </form>
      </Box>

      <Box flex="1" display={['none', 'none', 'block']} p={6}>
        <Image src={aboutImage} alt="Candidature" />
      </Box>
    </Flex>
  );
};

export default ApplicationForm;
