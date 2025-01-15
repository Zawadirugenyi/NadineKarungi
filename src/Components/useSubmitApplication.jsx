import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useSubmitApplication = () => {
  const [loading, setLoading] = useState(false); // Track submission status
  const toast = useToast();

  const submitApplication = async (formData) => {
    const formDataToSend = new FormData();

    // Log the incoming form data for debugging
    console.log('Submitting form data:', formData);

    // Append the form data to FormData object
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      } else {
        console.warn(`${key} is missing or empty!`);
      }
    });

    // Log the FormData to verify it's being appended correctly
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    // Ensure the 'sex' field is valid before making the API request
    if (!formData.sex || (formData.sex !== 'male' && formData.sex !== 'female')) {
      toast({
        title: 'Invalid input.',
        description: 'The "sex" field must be either "male" or "female".',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Stop submission if validation fails
    }

    // Convert sex to M or F
    if (formData.sex === 'female') formDataToSend.set('sex', 'F');
    if (formData.sex === 'male') formDataToSend.set('sex', 'M');

    try {
      setLoading(true);
      const response = await axios.post(
        'https://microtousadmin.onrender.com/api/applications/',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Log the response from the server
      console.log('Server response:', response.data);

      toast({
        title: 'Application submitted.',
        description: 'Your application has been successfully submitted!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Return response data for further processing if needed
      return response.data;
    } catch (error) {
      if (error.response) {
        // Log the error response from the server
        console.error('Error response:', error.response.data);

        const errorMessage = error.response.data?.sex
          ? `Invalid value for "sex": ${error.response.data.sex.join(', ')}`
          : error.response.data?.message || 'Something went wrong.';

        toast({
          title: 'Submission failed.',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Error message:', error.message);

        toast({
          title: 'Network error.',
          description: 'Please check your internet connection and try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      throw error; // Throw the error to allow further handling by the caller
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading };
};

export default useSubmitApplication;
