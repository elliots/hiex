
L.TopoJSON = L.GeoJSON.extend({
  addData: function(jsonData) {

    if (jsonData.type === "Topology") {
      for (var key in jsonData.objects) {
        var geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }
});

$(function() {


    var map = L.map('main-map');

    function resetView() {
        // This is where you set the initial view centre
        map.setView([5, 120], 3);
    }

    resetView();

    // Add background map tiles
    // Go here to find others : https://github.com/leaflet-extras/leaflet-providers/blob/master/README.md
    L.tileLayer.provider('Stamen.TonerLite').addTo(map);


    $.subscribe('country.click', function(topic, feature, layer) {
        console.log('country click', feature, layer);
        map.fitBounds(layer.getBounds());
        zoomed = true;
        //map.fitWorld();
    });

    map.on('click', function(e) {
        resetView();
        zoomed = false;
    });

    // You can create full custom map tiles here : http://cloudmade.com/

    $.get('map.topojson', function(data) {
       window.topo = data;

       var countries = new L.TopoJSON(JSON.parse(data), {
            style: function(feature) {

                return {
                    fillColor: '#cee0f4',
                    weight: 0,
                    fillOpacity: 1
                };

            },
            onEachFeature: function (feature, layer) {
                    layer.on({

                        click: function (e) {
                            $.publish('country.click', feature, layer);
                        },

                        mouseover: function(e) {
                            var layer = e.target;

                            layer.setStyle({
                                fillColor: '#000898'
                            });

                            if (!L.Browser.ie && !L.Browser.opera) {
                                layer.bringToFront();
                            }
                        },

                        mouseout: function(e) {
                            e.target.setStyle({
                                fillColor: '#cee0f4'
                            });

                        }

                    });
                },
       });
       countries.addTo(map);
    });


});
