import React from 'react';


function Hostel_Card() {
  // Example hostel data (replace with your actual data or fetch from API)
  const hostels = [
    {
      name: 'Sample Hostel 1',
      address: '123 Sample St, Sample City',
      image: 'https://example.com/sample-image.jpg', // Replace with actual image URL
    },
    {
      name: 'Sample Hostel 2',
      address: '456 Example Ave, Example Town',
      image: 'https://example.com/another-image.jpg', // Replace with actual image URL
    },
  ];

  return (
    <div>
      <h1>Hostels</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {hostels.map((hostel, index) => (
          <Hostel_Card
            key={index}
            name={hostel.name}
            address={hostel.address}
            image={hostel.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Hostel_Card;
