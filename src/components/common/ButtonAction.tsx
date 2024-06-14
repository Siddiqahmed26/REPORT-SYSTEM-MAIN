'use client';

import { updateReport } from '@/app/actions/updateReport';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ButtonAction = ({ item }: any) => {
  const handleClear = async () => {
    const result = await updateReport(item?.id);
    if (result) {
      toast.success('Updated Successfully');
    }
  };

  return <Button onClick={handleClear}>Pending</Button>;
};

export default ButtonAction;
