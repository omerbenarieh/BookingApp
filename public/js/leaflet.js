// Map //
export const displayMap = locations => {
  const map = L.map('map', {
    center: [34.111745, -118.113491],
    zoom: 10,
    zoomSnap: 0.5,
  });

  // Tile layer //
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // GreenIcon //
  const greenIcon = L.icon({
    iconUrl: '/img/pin.png',
    iconSize: [32, 40],
    iconAnchor: [16, 45],
    popupAnchor: [0, -50],
  });

  // Adding markers base on coordinates //
  const points = [];
  locations.forEach(loc => {
    // Create points
    points.push([loc.coordinates[1], loc.coordinates[0]]);

    // Add markers
    L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: greenIcon })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        className: 'mapPopup',
      })
      .openPopup();
  });

  const bounds = L.latLngBounds(points);
  map.flyToBounds(bounds, {
    duration: 2,
    easeLinearity: 0.25,
    maxZoom: 6.5,
  });

  map.scrollWheelZoom.disable();
};
