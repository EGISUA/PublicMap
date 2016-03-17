
var grid;
var restEndpoint;
var printTask;

require([
    "dojo/ready",
    "dijit/form/Button",
    "dojo/dom",
    "dijit/layout/ContentPane",
    "dojox/grid/DataGrid"
], function (
    ready,
    Button,
    dom,
    ContentPane,
    DataGrid
    ) {
    ready(function () {
        
            var gridContent = new ContentPane({
                region: 'left',
                id: 'gridContentPane'

            });

            //gridContent.placeAt(document.getElementById('gridTOC'));

            var store = null;
            grid = new DataGrid({
                store: store,
                id: 'grid',

                query: { id: "*" },
                structure: [

            { name: "Project #", field: "Projects.ProjectNumber", id: "ProjectNumber", width: "60px" },
            { name: "Project Name", field: "CMS_Projects.title", width: "165px" }
                ]
            });

            //grid.placeAt(gridContent);
            grid.placeAt(document.getElementById('gridTOC'));
            //modify the grid so only the STATE_NAME field is sortable
            grid.canSort = function (col) { if (Math.abs(col) == 2) { return true; } else { return false; } };

            grid.on("RowClick", function (evt) {
                var rowIndex = evt.rowIndex;
                rowData = grid.getItem(rowIndex);
                zoomRow(rowData["Projects.ProjectNumber"][0]);
            });
        

    });
});



var map, projects;
var app = {};



function init() {
    require([
        "esri/map",
        "esri/tasks/LegendLayer",
        "esri/tasks/PrintTask",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/tasks/query",
        "dojo/data/ItemFileReadStore",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "dijit/form/Button", 
        "dojo/dom",
        "esri/tasks/PrintParameters",
        "esri/tasks/PrintTemplate"
    ], function (
        Map,
        LegendLayer,
        PrintTask,
        ArcGISTiledMapServiceLayer,
        FeatureLayer,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Query,
        ItemFileReadStore,
        ArcGISDynamicMapServiceLayer,
        Button,
        dom,
        PrintParameters,
        PrintTemplate
        ) {

        map = new Map("map", {
            basemap: "streets",
            center: [-110.951944, 32.231667],
            zoom: 16,
            logo: false
        });

        restEndpoint = getRestEndpointFromConfig();

        printTask = new PrintTask(restEndpoint + "CustomPrintJob/GPServer/Export%20Web%20Map", { async: true });

        var legendlyr = new LegendLayer();
        legendlyr.layerId = 'projects';

        var printTemplates = new PrintTemplate();
        printTemplates.layout= "PrintProjects";
        printTemplates.layoutOptions = { legendLayers: [legendlyr] };

        // Creating print button programmatically and execute once the button is clicked
        var printButton = new Button({
            onClick: function () {
                projects.clearSelection();
                if (map.infoWindow) { map.infoWindow.hide(); }
                dom.byId("printButton").innerHTML = "Printing";
                var params = new PrintParameters();
                params.map = map;
                params.template = printTemplates;
                printTask.execute(params);
            }
        }, "printButton");

        dojo.connect(printTask, 'onComplete', function (value) {
            window.open('CustomPrinting.aspx?url=' + value.url, '_blank');
            dom.byId("printButton").innerHTML = "Print";
        });

        dojo.connect(printTask, 'onError', function (error) {
            dom.byId("printButton").innerHTML = "Print";
        });

        var enterprise_tile = new ArcGISTiledMapServiceLayer(restEndpoint + "campus/MapServer");
        enterprise_tile.id = "campus";
        map.addLayer(enterprise_tile);


        map.infoWindow.resize(350, 265);

        //Applying info template in the init function caused the application to show up Date in incorrect format.
        //Implemented the JS function suggested by Kelly (Esri) http://forums.arcgis.com/threads/14510-Dojo-Datagrid-doesn-t-return-SDE-date-format-field-correctly-for-related-table
        //Connected onClick handler and setup the infotemplate
        //When row is clicked in TOC, the same function is called to format date and show up in Infowindow
        //Have to test and see if this change makes any difference
        projects = new FeatureLayer(restEndpoint + "campus_features/MapServer/51", {
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            id: "projects"
            //infoTemplate: infoTemplate
        });

        dojo.connect(projects, "onClick", projectsOnClick);

        // //define a selection symbol 
        var highlightSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 30,
                               new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                               new dojo.Color([255, 203, 105]), 2),
                               new dojo.Color([93, 135, 173]));

        projects.setSelectionSymbol(highlightSymbol);

        dojo.connect(projects, 'onLoad', function (layer) {
            var query = new Query();
            query.where = "1=1";
            query.outFields = ["*"];
            layer.queryFeatures(query, function (featureSet) {
                var items = dojo.map(featureSet.features, function (feature) {
                    return feature.attributes;
                });
                var data = {
                    identifier: "Projects.OBJECTID",
                    items: items
                };
                store = new ItemFileReadStore({ data: data });
                grid.setStore(store);
                grid.setSortIndex(1, "true"); //sort on the state name          
            });
        });
        map.addLayers([projects]);


        var labels = new ArcGISDynamicMapServiceLayer(restEndpoint + "campus_features/MapServer", {
            id: "labels",
            showAttribution: false
        });
        labels.setVisibleLayers([49, 50]);
        map.addLayer(labels);

        toggleLabels();
    });
}

function backToInitialExtent() {
    require([
        "esri/geometry/Point"
    ], function (
        Point
        ) {
        map.centerAndZoom(new Point(-110.951944, 32.231667), 16);
    });
}

//http://forums.arcgis.com/threads/14510-Dojo-Datagrid-doesn-t-return-SDE-date-format-field-correctly-for-related-table -- Incorrect with ENR2 project
//Implemented this code suggested by Derek Swingley (ESRI): http://jsfiddle.net/yEkjm/
// Feb 2014 - TOBY - Sometimes "value" was coming in as an Array, in which case we want to evaluate the first element in the array
function formatDate(value) {
    var dateValue;

    if (value instanceof Array) {
        dateValue = value[0];
    }
    else {
        dateValue = value;
    }

    if (dateValue != null) {
        // get the timezone offset from UTC time
        var tzoffset = new Date().getTimezoneOffset();
        // add the time zone offset to the timestamp 
        var utctime = dojo.date.add(new Date(dateValue), "minute", tzoffset);
        localDate = dojo.date.locale.format(utctime, {
            "selector": "date",
            "datePattern": "MMM yyyy"
        });
    } else {
        localDate= "";
    }
    return localDate;

}

function projectsOnClick(evt) {
    var startDate = formatDate(evt.graphic.attributes["CMS_Projects.start_date"]);
    var endDate = formatDate(evt.graphic.attributes["CMS_Projects.end_date"]);
    setInfoWindow(startDate, endDate);
}

function setInfoWindow(startDate, endDate) {
    require([
        "esri/InfoTemplate"
    ], function (
        InfoTemplate
        ) {
        var content = "<b>Forecasted Construction</b>: " + startDate + " - " +
                          endDate + " <br />" +
                         "<b>Status</b>: ${CMS_Projects.status} <br /><br />" +
                         "${CMS_Projects.description}<br />";

        var infoTemplate = new InfoTemplate("${CMS_Projects.title}<br /><b>Project #</b>: <a href='${CMS_Projects.URL}' target='_blank'>${Projects.ProjectNumber}</a>", content);

        projects.setInfoTemplate(infoTemplate);
    });
}


function zoomRow(id) {
    require([
        "esri/tasks/query",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point"
    ], function (
        Query,
        FeatureLayer,
        Point
        ) {
        projects.clearSelection();
        var query = new Query();
        query.where = "Projects.ProjectNumber = '" + id + "'";

        projects.selectFeatures(query, FeatureLayer.SELECTION_NEW, function (features) {
            if (features.length === 0) {
                alert("Project: " + id + " is not currently mapped.");
                return;
            }

            var startDate = formatDate(features[0].attributes["CMS_Projects.start_date"]);
            var endDate = formatDate(features[0].attributes["CMS_Projects.end_date"]);

            setInfoWindow(startDate, endDate);

            var stateExtent = features[0].geometry.getExtent();

            if (map.infoWindow.isShowing) { map.infoWindow.hide(); }
            map.infoWindow.setContent(features[0].getContent());
            map.infoWindow.setTitle(features[0].getTitle());
            map.infoWindow.show(new Point(features[0].geometry.points[0][0], features[0].geometry.points[0][1], features[0].geometry.spatialReference), map.getInfoWindowAnchor(features[0].geometry));

            if (features[0].geometry.points.length > 1) {
                map.setExtent(stateExtent.expand(2));

            }
            else {
                map.centerAndZoom(new Point(features[0].geometry.points[0][0], features[0].geometry.points[0][1], features[0].geometry.spatialReference), 19);
            }




        });
    });
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function toggleAerials() {

    if (map.getBasemap() == "streets") {
        map.setBasemap("satellite");
        map.getLayer("campus").hide();
    } else {
        map.setBasemap("streets");
        map.getLayer("campus").show();

    }

}

function toggleLabels() {
    if (dojo.byId("labelsOnOff").checked) {
        map.getLayer("labels").show();
    }
    else {
        map.getLayer("labels").hide();
    }
}

function getRestEndpointFromConfig() { //http://dojotoolkit.org/reference-guide/1.7/quickstart/ajax.html
    require([
        "dojo/_base/xhr"
    ], function (
        xhr
        ) {
        //var restEndpoint;
        xhr.get({
            url: "config.txt",
            handleAs: "text",
            sync: true,
            handle: function (restEndpoints, args) {
                var endpointsArray = restEndpoints.split("\n");
                endpointsArray.forEach(function (url) {
                    if (url.substring(0, 2) != "//") {
                        restEndpoint = url;
                    }
                });
            }
        });
        
    });
    return restEndpoint;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



dojo.ready(init);

