import "../../resource/scss/style.scss";
import "../../index.html";

// Map

const OFFICE_LOCATION = [-73.96, 40.78];

const MAP_ZOOM_LEVEL = 16;
const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";
const MAP_CONTAINER = "map";

const MARKER_COLOR = "black";

mapboxgl.accessToken = process.env.MAPBOX_KEY || 0;

const map = new mapboxgl.Map({
  container: MAP_CONTAINER,
  style: MAP_STYLE,
  center: OFFICE_LOCATION,
  zoom: MAP_ZOOM_LEVEL,
});

const marker = new mapboxgl.Marker({
  color: MARKER_COLOR,
})
  .setLngLat(OFFICE_LOCATION)
  .addTo(map);

// Scroll anchor
const HIDE_TO_THE_TOP_ANCHOR_TIMEOUT = 500;
const toTheTopAnchor = document.getElementById("to-the-top-anchor");
let timer = null;
let mouseOverToTheTopAnchor = false;

function onDocumentScroll() {
  if (timer !== null) {
    clearTimeout(timer);

    toTheTopAnchor.style.display = "none";
  }

  timer = setTimeout(function () {
    if (!mouseOverToTheTopAnchor) {
      toTheTopAnchor.style.display = "block";
    }
  }, HIDE_TO_THE_TOP_ANCHOR_TIMEOUT);
}

document.addEventListener("scroll", onDocumentScroll);
