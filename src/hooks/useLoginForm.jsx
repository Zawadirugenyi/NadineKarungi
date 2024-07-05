import { useState } from 'react';
import axios from 'axios';

const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      // Handle successful login (e.g., store token in localStorage)
      console.log('Login successful!', response.data);
      setIsSubmitting(false);
      setError(null);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
      setIsSubmitting(false);
    }
  };

  return { username, setUsername, password, setPassword, handleSubmit, isSubmitting, error };
};

export default useLoginForm;
