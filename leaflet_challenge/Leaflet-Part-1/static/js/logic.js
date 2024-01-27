function createMap(earthquakes) {

    // Create the base layers //
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object //
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create the earthquakes overlay using the layer //
    let overlays = {
      Earthquakes: earthquakes
    };
  
    // Create the map with initial layers //
    let myMap = L.map("map", {
      center: [
        40.806862, -96.681679
      ],
      zoom: 4,
      layers: [street, earthquakes]
    });


    // Create a control for our layers, and add overlays //
    L.control.layers(null, overlays).addTo(myMap);

    // Create a legend and place it in the bottom right of the map //
    let info = L.control({
    position: "bottomright"
    });
  
     // When the layer control is added, insert a div with the class of "legend" //
    info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
    };
    // Add the legend to the map //
    info.addTo(myMap);
}  

function createMarkers(response) {

    // Pull the "features" property from response //
    let markerFeatures = response.features;
  
    // Initialize an array to hold markers //
    let eqMarkers = [];
  
    // Loop through the coordinates array //
    for (let i = 0; i < markerFeatures.length; i++) {
        let instance = markerFeatures[i];
        
        // Set icon size & color based on magnitude and depth, respectively //
        let mag = instance.properties.mag;
        console.log(mag);
        let depth = instance.geometry.coordinates[2];
        console.log(depth);



        let myIcon = L.icon({
            iconUrl: '',
            iconSize: ,
        });

        // For each instance, create a marker and bind a popup with the location, instance magnitude, and instance depth //
        let eqMarker = L.marker([instance.geometry.coordinates[1], instance.geometry.coordinates[0]], {icon: myIcon})
            .bindPopup("<h3>" + instance.properties.place + "<h3><h4>Magnitude: " + mag + "<br>Depth: " + depth + " km</h4>");
  
        // Add the marker to the eqMarkers array.
        eqMarkers.push(eqMarker);
        console.log(eqMarker);
    }
  
    // Create a layer group from the array and pass it to the createMap function //
    createMap(L.layerGroup(eqMarkers));
}
  
// Store our API endpoint as queryUrl //
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Perform an API call to get the earthquake data. Call createMarkers when it completes //
d3.json(queryUrl).then(createMarkers);