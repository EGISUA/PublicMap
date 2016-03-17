<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MegaCSSOnlyBubbleFullScreen.master"
    AutoEventWireup="true" CodeFile="Default_Old.aspx.cs" Inherits="Maps_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=7,IE=9" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/esri/css/esri.css" />
    <link href="css/MapFullWidth.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        var djConfig = { parseOnLoad: true };
    </script>
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=3.4"></script>
    <script type="text/javascript" src="js/function.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageHeader" runat="Server">
    <div id="BoxStylePageHeader">
        Campus Projects Map
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="legend">
        <div class="legendSymbol">
            <img src="http://services.maps.arizona.edu/pdc/rest/services/campus_features/MapServer/41/images/6b9354d7eda670c00fc22fb57c470187"
                alt="Design Site" />
        </div>
        <div class="legendItemDesc">
            Design</div>
        <div style="clear: both;">
        </div>
        <div class="legendSymbol">
            <img src="http://services.maps.arizona.edu/pdc/rest/services/campus_features/MapServer/41/images/23b7dfe113063e08bea44d9bb7dad050"
                alt="Construction Site" />
        </div>
        <div class="legendItemDesc">
            Construction</div>
        <div style="clear: both;">
        </div>
        <div class="legendSymbol">
            <img src="construction.png" alt="Construction Area" style="width: 18px" />
        </div>
        <div class="legendItemDesc">
            Project Site</div>
        <div style="clear: both;">
        </div>
    </div>
    <div id="toc">
        <div id="toc-switches">
            <input type="checkbox" name="toggleLabels" />
            <span>Toggle Labels On/Off</span>
            <br />
            <input type="checkbox" name="aerialButton" onchange="toggleAerials()" />
            <span>Toggle Aerials On/Off</span>
        </div>
        <hr />
        <div id="toc-projects">
            <table data-dojo-type="dojox.grid.DataGrid" jsid="grid" id="grid" selectionmode="none">
                <thead>
                    <tr>
                        <th field="ObjectID">
                        ObjectID
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div id="map">
    </div>
</asp:Content>
