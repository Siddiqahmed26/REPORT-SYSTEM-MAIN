'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const handleLogout = async () => {
    signOut({ callbackUrl: '/' });
  };

  return <Button onClick={handleLogout}>Sign out</Button>;
};

export default LogoutButton;
