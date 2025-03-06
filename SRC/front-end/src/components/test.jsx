import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const TestToast = () => {
  useEffect(() => {
    toast.success("Test toast success!");
  }, []);

  return <div>Check your toast!</div>;
};

export default TestToast;