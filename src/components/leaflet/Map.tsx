import React from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../common/MapView'), { ssr: false });

export default Map;
