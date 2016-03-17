function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}



function init() {
    var url = getParameterByName('url');

    document.getElementById('mapImage').src = url;

    $.ajax({
        url: "http://services.maps.arizona.edu/pdc/rest/services/campus_features/MapServer/51/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CMS_Projects.title%2CProjects.ProjectNumber&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=CMS_Projects.title&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&f=pjson",
        type: "GET",

        dataType: "json",
        success: function (result) {

            var features = result.features;
            var i = 1;
            features.forEach(function (feature) {

                var oddRow = "evenRow", projNum = "projectNumber", projTitle = "projectTitle";
                if (i % 2 == 1) {
                    oddRow = "oddRow";
                    projNum = "projectNumberOdd";
                    projTitle = "projectTitleOdd";
                }
                $('#TOC-Table tbody').append("<tr class='" + oddRow + "'><td class='proj-num " + projNum + "'>" + feature.attributes['Projects.ProjectNumber']
                    + "</td> <td class='proj-title " + projTitle + "'>" + feature.attributes['CMS_Projects.title'] + "</td></tr>");
                i += 1;
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
    

}