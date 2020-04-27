function make_stops() {

}
stops = make_stops(15);

getIsochroneLayers = async (lon, lat, stops) => {
  const response = await fetch(
    "https://api.mapbox.com/isochrone/v1/mapbox/driving/" +
      lon +
      "," +
      lat +
      "?contours_minutes=" +
      stops.contours_minutes.toString() +
      "&contours_colors=" +
      stops.contours_colors.toString() +
      "&access_token=pk.eyJ1IjoiZ3BlcmV6MDUxOSIsImEiOiJjanNobHMycG0wYTd3NDlubWhkbWYxYWVuIn0.iRoBinoZhtueJNkIkR-Iew"
  );
  const myJson = await response.json();
  return myJson;
};

// isochroneLayers = getIsochroneLayers(40.742884, -73.897610, stops);

getIsochroneLayers(40.742884, -73.897610, stops).then(data => isochroneLayers = data);

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3BlcmV6MDUxOSIsImEiOiJjanNobHMycG0wYTd3NDlubWhkbWYxYWVuIn0.iRoBinoZhtueJNkIkR-Iew";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v11",
  center: [40.742884, -73.897610],
  zoom: 10
});
map.on("load", function() {
  var layers = map.getStyle().layers;
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      console.log(layers)
      break;
    }
  }
  map.addLayer(
    {
      id: "urban-areas-fill",
      type: "fill",
      source: {
        type: "geojson",
        data: isochroneLayers
      },
      layout: {},
      paint: {
        "fill-color": "#f08",
        "fill-opacity": 0.4
      }
    },
    "waterway-shadow"
  );
});

var marker = new mapboxgl.Marker({
  draggable: true
})
  .setLngLat([40.742884, -73.897610])
  .addTo(map);

function onDragEnd() {
}

marker.on("dragend", onDragEnd);

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});
map.addControl(geocoder);

geocoder.on("result", function(ev) {
  marker.setLngLat(ev.result.geometry.coordinates);
});