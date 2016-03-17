<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MegaCSSOnlyBubble.master" AutoEventWireup="true" CodeFile="projects.aspx.cs" Inherits="Maps_projects" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.8/js/dojo/dijit/themes/claro/claro.css"/>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript">        var djConfig = { parseOnLoad: true };</script>
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.8"></script>
    <script type="text/javascript" src="js/function-min.js"></script>
    <script type="text/javascript" src="js/function.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageHeader" Runat="Server">
    <div id="BoxStylePageHeader">Campus Project Map <span style="color:red">Beta</span></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div id="legend">
	    <div>
		<div class="legendSymbol"">
		    <img src="http://services.maps.arizona.edu/ArcGIS/rest/services/campus_features/MapServer/39/images/2351876F" />
		</div>		
		<div class="legendItemDesc">Design</div>
	    </div>
	    <div style="clear: both;">
		<div class="legendSymbol">
		    <img src="http://services.maps.arizona.edu/ArcGIS/rest/services/campus_features/MapServer/39/images/10140172" />
		</div>
		<div class="legendItemDesc">Construction</div>
	    </div>
</div>

<div class="claro" id="map" style="">
	
</div>
</asp:Content>

