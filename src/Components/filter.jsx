import React from 'react';
import { Box, Select, Input, Button, FormControl, FormLabel, Flex } from '@chakra-ui/react';

function Filter({ onFilterChange }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <Box display="flex" justifyContent="center" p={4} bg="white" borderRadius="md" mb={4}>
      <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
        <FormControl id="location" display="flex" alignItems="center" width={{ base: '100%', md: 'auto' }}>
          <FormLabel mb="0" mr={2}>Location</FormLabel>
          <Select placeholder="Select location" name="location" onChange={handleFilterChange}>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Athiriver</option>
            
          </Select>
        </FormControl>

        <FormControl id="price" display="flex" alignItems="center" width={{ base: '100%', md: 'auto' }}>
          <FormLabel mb="0" mr={2}>Price</FormLabel>
          <Input
            placeholder="Enter price"
            name="price"
            type="text"
            onChange={handleFilterChange}
          />
        </FormControl>

        <FormControl id="category" display="flex" alignItems="center" width={{ base: '100%', md: 'auto' }}>
          <FormLabel mb="0" mr={2}>Category</FormLabel>
          <Select placeholder="Select category" name="category" onChange={handleFilterChange}>
            <option value="luxury">Bedsitter</option>
            <option value="standard">One Bedroom</option>
            <option value="budget">Two Bedrooms</option>
             <option value="budget">Three Bedrooms</option>
          </Select>
        </FormControl>

        <Button   bg="#0097b2" color="white">
          search
        </Button>
      </Flex>
    </Box>
  );
}

export default Filter;
