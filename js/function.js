dojo.require("esri.virtualearth.VETiledLayer");
dojo.require("esri.layers.FeatureLayer");
dojo.require("dojox.grid.DataGrid");

function init() {

    map = new esri.Map("map", {
        //extent: initExtent,
        center: [-110.951944, 32.231667],
        zoom: 16,
        logo: false
    });

    dojo.connect(map, "onLoad", initOperationalLayer);

    var bing = new esri.virtualearth.VETiledLayer({
        bingMapsKey: 'Al_odDeNeFrAQz9Z840Q1WepmpUI5ZbsRC7IWI2r7M18vuhevz5vZ7wxJwaL41tq',
        mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD,
        id: "bing"
    });
    map.addLayer(bing);

    var enterprise_tile = new esri.layers.ArcGISTiledMapServiceLayer("http://services.maps.arizona.edu/pdc/rest/services/enterprise/MapServer");
    enterprise_tile.id = "campus";
    map.addLayer(enterprise_tile);

    dojo.connect(map, 'onLoad', function(theMap) {
        //resize the map when the browser resizes
        dojo.connect(dijit.byId('map'), 'resize', map,map.resize);
    });
}

function initOperationalLayer(map) {

    var content = "<b>Forecasted Construction</b>: ${CMS_Projects.start_date:DateFormat(datePattern:'MMM yyyy', selector:'date')} - " +
                  "${CMS_Projects.end_date:DateFormat(datePattern:'MMM yyyy', selector:'date')} <br />" +
                 "<b>Status</b>: ${CMS_Projects.status} <br /><br />" +
                 "${CMS_Projects.description}<br />";

    var infoTemplate = new esri.InfoTemplate("${CMS_Projects.title}<br /><b>Project #</b>: <a href='${CMS_Projects.URL}'>${Projects.ProjectNumber}</a>", content);

    var projectLayer = new esri.layers.FeatureLayer("http://services.maps.arizona.edu/pdc/rest/services/campus_features/MapServer/41", {
        mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
        outFields: ["*"],
        infoTemplate: infoTemplate
    });

    map.addLayer(projectLayer);
    map.infoWindow.resize(350, 265);
}

function toggleAerials() {
    if (map.getLayer("bing").mapStyle == "road") {
        map.getLayer("bing").setMapStyle(esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL);
        map.getLayer("campus").hide();
    }
    else {
        map.getLayer("bing").setMapStyle(esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD);
        map.getLayer("campus").show();
    }
}

dojo.addOnLoad(init);

