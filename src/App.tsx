import React, { useState, useEffect } from "react";
import "./App.css";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngLiteral } from "leaflet";

import io from "socket.io-client";

type MarkerData = {
  id: string;
  position: LatLngLiteral;
  text: string;
};

const App = () => {
  const [center] = useState<LatLngLiteral>({
    lat: 52.768333,
    lng: 23.191944,
  });
  const [zoom] = useState(13);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const socket = io("localhost:8081/map");
    socket.on("markers", (markers: MarkerData[]) => {
      console.log("blabla");
      setMarkers(markers);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Map center={center} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            riseOnHover
            key={marker.id}
            position={marker.position}
            opacity={0.6}
          >
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default App;

