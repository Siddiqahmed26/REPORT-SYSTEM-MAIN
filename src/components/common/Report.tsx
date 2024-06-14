'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import { report } from '../../app/actions/report';
import { toast } from 'sonner';
import { getSession, useSession } from 'next-auth/react';

const Report = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [user, setUser] = useState<any>();
  const [testCoordinates, seyTestCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleChangeAnonymous = (e: any) => {
    setAnonymous((prev) => !prev);
  };

  const getUser = async () => {
    const session = await getSession();
    setUser(session?.user?.email);
  };

  useEffect(() => {
    const getUserCoordinates = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      getUser();

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
  }, []);

  const handleLatitudeChange = (e: any) => {
    const latitude = parseFloat(e.target.value);
    seyTestCoordinates((prev: any) => ({ ...prev, latitude }));
  };

  const handleLongitudeChange = (e: any) => {
    const longitude = parseFloat(e.target.value);
    seyTestCoordinates((prev: any) => ({ ...prev, longitude }));
  };

  const handleSubmit = async () => {
    if (description === '') {
      toast.error('Description is required');
      return;
    }

    let finalCoordinates = [coordinates?.latitude, coordinates?.longitude];

    if (testCoordinates.latitude && testCoordinates.longitude) {
      finalCoordinates = [testCoordinates.latitude, testCoordinates.longitude];
    }

    const result = await report(finalCoordinates, description, anonymous);

    if (result) {
      toast.success('Successfully Reported Incident');
      setOpen(false);
    } else {
      toast.error('An error occurred');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-sky-500'>Report</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] z-50'>
        <DialogHeader>
          <DialogTitle>Report an incident</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Textarea
            placeholder='Type your incident here.'
            required
            value={description}
            onChange={handleChangeDescription}
          />
          {user === 'bhuvan@saividya.ac.in' ? (
            <>
              <Input
                type='number'
                placeholder='latitude'
                onChange={handleLatitudeChange}
              />
              <Input
                type='number'
                placeholder='Longitude'
                onChange={handleLongitudeChange}
              />
            </>
          ) : (
            <></>
          )}
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={anonymous}
              onCheckedChange={handleChangeAnonymous}
            />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Make this report <b>anonymous</b>
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Report;
