
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
// Wards hover events
function resetHighlight(e) {
        var layer = e.target;

    layer.setStyle({
        weight: 0.2
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    
    
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Legend

function getColor_far(d){
  return d > 20 ? '#800026' :
           d > 10  ? '#BD0026' :
           d > 7  ? '#E31A1C' :
           d > 5  ? '#FC4E2A' :
           d > 3   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#FFEDA0';
}

function getColor_gsi(d){
  return d > 0.9 ? '#005824' :
           d > 0.8  ? '#238b45' :
           d > 0.65  ? '#41ae76' :
           d > 0.5  ? '#66c2a4' :
           d > 0.35   ? '#99d8c9' :
           d > 0.2   ? '#ccece6' :
           d > 0.05   ? '#e5f5f9' :
                      '#f7fcfd';
}

function style_gsi(feature) {
    return {
        fillColor: getColor_gsi(feature.properties.gsi),
        weight:1,
        fill:true,
        color:"white",
        fillOpacity:0.7,
        clickable:true
    };
}
function style_far(feature) {
    return {
        fillColor: getColor_far(feature.properties.far),
        weight:1,
        fill:true,
        color:"white",
        fillOpacity:0.7,
        clickable:true
    };
}





