import React, { useState, useEffect } from 'react';
import { Select, Box, Text } from '@chakra-ui/react';
import axios from 'axios';

const RoomFilter = ({ onFilterChange }) => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState('');

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hostels/');
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value);
    onFilterChange(event.target.value); // Propagate filter change to parent component
  };

  return (
    <Box p={4} bg="gray.100">
      <Text mb={2} fontWeight="bold">Filter by Hostel:</Text>
      <Select value={selectedHostel} onChange={handleHostelChange}>
        <option value="">All Hostels</option>
        {hostels.map((hostel) => (
          <option key={hostel.id} value={hostel.name}>
            {hostel.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default RoomFilter;
