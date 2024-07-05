import { useState } from 'react';
import axios from 'axios';

const useSignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register/', {
        username,
        password,
        email,
      });
      // Handle successful signup (e.g., show success message)
      console.log('Signup successful!', response.data);
      setIsSubmitting(false);
      setError(null);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up');
      setIsSubmitting(false);
    }
  };

  return { username, setUsername, password, setPassword, email, setEmail, handleSubmit, isSubmitting, error };
};

export default useSignupForm;
