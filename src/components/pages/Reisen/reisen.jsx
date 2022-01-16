import React from 'react'
import Navbar from '../../Navbar/Navbar';
import NeueReisen from '../../NeueReisen/NeueReisen';
import Reisekarten from '../../Reisekarten/Reisekarten'

export default function reisen() {
    return (
      <div>
        <Navbar />
        <NeueReisen />
        <Reisekarten/>
      </div>
    );
}
