'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { sos } from '@/app/actions/sos';
import { toast } from 'sonner';

const SOS = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to get user coordinates
    const getUserCoordinates = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      const success = (position: any) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      };

      const error = (err: any) => {
        setError(`Error retrieving location: ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    };

    getUserCoordinates();
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleSOS = async () => {
    const response = await sos([coordinates?.latitude, coordinates?.longitude]);
    if (response) {
      toast.success('SOS TRIGGERED');
    }
  };

  return (
    <Button variant={'destructive'} onClick={handleSOS}>
      SOS
    </Button>
  );
};

export default SOS;
