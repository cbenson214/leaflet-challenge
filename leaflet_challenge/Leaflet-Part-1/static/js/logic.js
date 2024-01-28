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
      layers: [topo, earthquakes]
    });


    // Create a control for our layers, and add overlays //
    L.control.layers(baseMaps, overlays).addTo(myMap);

    // Create a legend and place it in the bottom right of the map //
    var legend = L.control({
    position: "bottomright"
    });
  
    // When the legend is added, insert a div for it //
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create('div', 'info legend'),
            depth = [-10, 10, 30, 50, 70, 90],
            labels = [];

        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

        for (let i =0; i < depth.length; i++) {
            div.innerHTML += 
                '<i style="background:' + depthColor(depth[i] + 1) + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        
        return div;
    };

    // Add the legend to the map //
    legend.addTo(myMap);
};

// Determine marker color by depth //
function depthColor(depth) {
    if (depth < 10) return "green";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "red";
};

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

        let options = {
            radius: mag*2,
            fillColor: depthColor(depth),
            color: 'black',
            weight: .3,
            opacity: 1,
            fillOpacity: .66            
        };

        // For each instance, create a marker and bind a popup with the location, instance magnitude, and instance depth //
        let eqMarker = L.circleMarker([instance.geometry.coordinates[1], instance.geometry.coordinates[0]], options)
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