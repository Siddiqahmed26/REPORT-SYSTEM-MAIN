'use client';

import landingAnimation from '@/animation/animation.json';
import Lottie from 'lottie-react';
import React from 'react';

const LandingAnimation = () => {
  return (
    <Lottie className='md:w-2/3 mx-auto' animationData={landingAnimation} />
  );
};

export default LandingAnimation;
