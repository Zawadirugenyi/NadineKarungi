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
import aboutImage from '../Components/Assetes/Gerante1.jpeg'; // Corrected path for image import

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

  const { submitApplication, loading } = useSubmitApplication(); // Use the hook for submission
  const toast = useToast();

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0], // Store the first selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(formData);
      
      // Reset the form data after successful submission
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
        title: 'Application submitted.',
        description: 'Your application has been successfully submitted!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error handling is done in the custom hook
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
          Application Form
        </Text>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={['1fr', '1fr 1fr']} gap={6}>
            <FormControl isRequired>
              <FormLabel htmlFor="full_name">Full Name</FormLabel>
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
              <FormLabel htmlFor="place">Place</FormLabel>
              <Input 
                id="place" 
                name="place" 
                value={formData.place} 
                onChange={handleChange} 
                placeholder="Bunia, RDC" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="nationality">Nationality</FormLabel>
              <Select 
                id="nationality" 
                name="nationality" 
                value={formData.nationality} 
                onChange={handleChange} 
                placeholder="Select Nationality"
              >
                <option value="congolese">Congolese</option>
                <option value="kenyan">Kenyan</option>
                <option value="rwandan">Rwandan</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="sex">Gender</FormLabel>
              <Select 
                id="sex" 
                name="sex" 
                value={formData.sex} 
                onChange={handleChange} 
                placeholder="Select Gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
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
              <FormLabel htmlFor="cover_letter">Cover Letter</FormLabel>
              <Input 
                id="cover_letter" 
                name="cover_letter" 
                type="file" 
                onChange={handleFileChange} 
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="other_documents">Other Documents</FormLabel>
              <Input 
                id="other_documents" 
                name="other_documents" 
                type="file" 
                onChange={handleFileChange} 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="years_of_experience">Years of Experience</FormLabel>
              <Select 
                id="years_of_experience" 
                name="years_of_experience" 
                value={formData.years_of_experience} 
                onChange={handleChange} 
                placeholder="Select Experience Level"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="starting_date">Starting Date</FormLabel>
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
            Submit
          </Button>
        </form>
      </Box>

      <Box flex="1" display={['none', 'none', 'block']} p={6}>
        <Image src={aboutImage} alt="Application" />
      </Box>
    </Flex>
  );
};

export default ApplicationForm;
