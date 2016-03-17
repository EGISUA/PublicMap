<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MegaCSSOnlyBubbleFullScreen.master"
	AutoEventWireup="true" CodeFile="FullScreen.aspx.cs" Inherits="FullScreen" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.8/js/dojo/dijit/themes/claro/claro.css" />
    <link href="MapFullWidth.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		var djConfig = { parseOnLoad: true };
	</script>
	<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.8"></script>
	<script type="text/javascript" src="js/function-min.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageHeader" runat="Server">
	<div id="BoxStylePageHeader">Campus Projects Map
	</div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

	<div id="legend">
		<div class="legendSymbol">
			<img src="http://services.maps.arizona.edu/ArcGIS/rest/services/campus_features/MapServer/39/images/2351876F" />
		</div>		
		<div class="legendItemDesc">Design</div>
		<div style="clear: both;"></div>
		<div class="legendSymbol">
			<img src="http://services.maps.arizona.edu/ArcGIS/rest/services/campus_features/MapServer/39/images/10140172" />
		</div>
		<div class="legendItemDesc">Construction</div>    
	</div>

    <div id="map"></div>    
</asp:Content>

