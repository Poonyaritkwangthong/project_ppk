"use client";
import React, { Component, useState } from 'react';

import { longdo, map, LongdoMap } from '../../longdo-map/LongdoMap';
//replace a LongdoMap.js file



class App extends Component {
  initMap(){
    map.Layers.setBase(longdo.Layers.GRAY);
  }
  

  render() {
    const mapKey = 'cdf777a731aea17fdf916e10c48b8099'
    return (
      <div className="h-screen text-black">
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
      </div>
    );
  }
}

export default App;