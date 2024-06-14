// @ts-nocheck

'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const MapView = () => {
  const [coordinates, setCoordinates] = useState([]);
  const center = [13.167884, 77.558751];

  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    axios
      .get(`/api/coordinates`)
      .then((result) => {
        setCoordinates(result?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={25}
      scrollWheelZoom={true}
      style={{
        width: '80vw',
        height: '90vh',
      }}
      className='mx-auto map-z-index'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {coordinates?.data?.map((each: any) => {
        return (
          <Marker position={each?.coordinates} icon={customIcon}>
            <Popup>{each?.description}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
