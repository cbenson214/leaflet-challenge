# leaflet-challenge
All script written by Christopher Benson. Reference for legend insertion and CSS styling found at <https://leafletjs.com/examples/choropleth/>. Script for the challenge can be found in the logic.js file, located in the following directories: "leaflet_challenge" > "Leaflet-Part-1" > "static" > "js". The CSS style sheet for the page is located in the following directories: "leaflet_challenge" > "Leaflet-Part-1" > "static" > "css". 
Description of "logic.js" code: 
* Setup "createMap" function, which creates the base map, the tile layers (i.e. topographic), the layer control, and the legend. The function also sets the initialized view for the map.
* Setup "depthColor" function, which assigns colors to future markers and legend lines based on a depth value.
* Create the circle markers with the "createMarkers" function. This function passes through the geoJSON data and runs a loop through it in order to create an array of marker points and information of interest (depth, maginitude). Also inside the loop I have an options object that calls the depthColor function and assigns a color to each marker. The final part of the "createMarkers" function calls the "createMap" function using the new marker array.
* Finally, the API call is performed and once complete, the "createMarkers" function is run.

Direct link to index.html:
https://cbenson214.github.io/