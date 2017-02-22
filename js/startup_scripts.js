//Create map
var Mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/duccioa/ciwrywi3f005m2pnycsiad4i8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHVjY2lvYSIsImEiOiJjaW80Z2l5bngwMDFudzZseWhnZHhsOWxtIn0.0osACDIq6ESlPKgardoYdw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
});

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var map = L.map('map', {
  center:[51.496, -0.09],
  zoom: 14,
  layers:[Mapbox, googleSat]
});

var controlScale = L.control.scale().addTo(map);



var plot_subset_Style = {
  color:"#A6A6A6",
  weight:1.5,
  fill:true,
  fillColor:"#ff33cc",
  fillOpacity:0.4,
  clickable:true
};

var plot_Layer_gsi = L.geoJSON(plot_Data, {
  style:style_gsi,
  onEachFeature:onEachFeature
});

var plot_Layer_far = L.geoJSON(plot_Data, {
  style:style_far,
  onEachFeature:onEachFeature
});

var plot_subset_Layer = L.geoJSON(plot_subset_Data, {
  style:plot_subset_Style,
  onEachFeature:onEachFeature
});




// Add control layer
var baseMaps = {
  "Street": Mapbox,
  "Satellite":googleSat
};
var overlayMaps = {
  "Ground coverage (GSI)": plot_Layer_gsi,
  "Floor to area ratio (FAR)": plot_Layer_far,
  "GSI < 0.2, FAR > 2.5": plot_subset_Layer
};
controlLayer = {
  "Satellite": googleSat,
  "Plots by GSI":plot_Layer_gsi,
  "Plots by FAR": plot_Layer_far,
  "GSI < 0.2, FAR > 2.5":plot_subset_Layer
  
};
L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);
//L.control.layers(null, controlLayer, {collapsed:false}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<b>Plot info</b><br />' +  (props ?
        'id: ' + props.plot_id + '<br />' +
        'FAR: ' + props.far + ' <br />' +
        'GSI: ' + props.gsi + ' <br />' +
        'Plot surface: ' + props.area_plot + ' sqm <br />' + 
        'Building footprint: ' + props.building_footprint + ' sqm <br />' +
        ''
        : 'Hover over a plot');
};

info.addTo(map);