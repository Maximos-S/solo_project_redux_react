import React, {useState, useEffect} from 'react';
import Stock from '../Stock';
import './mainBody.css'

function Main() {



  return (
    <div className="mainBody">
        <div className="stockDetail">
            <Stock />
        </div>
    </div>
  );
}

export default Main;
