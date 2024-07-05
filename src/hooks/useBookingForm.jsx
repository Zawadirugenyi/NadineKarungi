const useBookingForm = () => {
  const [roomId, setRoomId] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    axios.post('http://127.0.0.1:8000/booking/', { roomId, tenantId, checkInDate, checkOutDate })
      .then(response => {
        console.log('Booking created!', response.data);
        // Reset form state or perform any necessary actions
        setIsSubmitting(false);
      })
      .catch(error => {
        setError(error);
        setIsSubmitting(false);
      });
  };

  return { roomId, setRoomId, tenantId, setTenantId, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, handleSubmit, isSubmitting, error };
};
