// declare global {
//   interface Window {
//     L: any;
//   }
// }
// useEffect(() => {
//   const map = window.L.map('map').setView([51.505, -0.09], 13);
//   window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }).addTo(map);
// }, []);
// <div id="map" style={{ height: '1000px', width: '500px' }}></div>

export default function EventsMap() {
  return <p>This is the map</p>;
}
