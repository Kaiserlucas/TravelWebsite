import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Weltkarte from '../../Weltkarte/Weltkarte';
import KartePopup from '../../KartePopup/KartePopup';

export default function Karte() {
  return (
    <>
      <Navbar />
      <KartePopup />
      <Weltkarte />
    </>
  );
}
