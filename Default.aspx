<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MegaCSSOnlyBubbleFullScreen.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Maps_dojotest_master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=7, IE=9, IE=10">
    <title>Add zoom button to DataGrid</title>

    <!--<link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/dojo/dojox/grid/resources/Grid.css">
    <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/esri/css/esri.css">

    <script type="text/javascript">var dojoConfig = { parseOnLoad: true };</script>
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/"></script> -->

    <link rel="stylesheet" href="http://js.arcgis.com/3.7/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="http://js.arcgis.com/3.7/js/esri/css/esri.css">
    <script type="text/javascript" src="http://js.arcgis.com/3.7/"></script>

    <link href="css/style.css" rel="stylesheet" />
    <script src="js/map.js"></script>
    <script>
        $(window).load(function () {
            if (getParameterByName("id") != "") {
                zoomRow(getParameterByName("id"));
            }
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageHeader" runat="Server">
    <div id="BoxStylePageHeader">
        Campus Projects Map
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="TOC">
        <div id="TOC-Switches">
            <input type="checkbox" id="checkboxAerials" onchange="toggleAerials()" />
            Aerials On/Off
            <br />
            <input type="checkbox" id="labelsOnOff" onchange="toggleLabels()" checked />
            Labels On/Off
            <br />
            <!--<div id="printButton"></div>-->
            <button id="printButton" type="button">Print</button>
<%--            <div id="shareURL" class="dijitButton" onclick="shareURL()">
                <span role="presentation" class="dijit dijitReset dijitInline dijitButton" widgetid="dijit_form_Button_0">
                    <span role="presentation" data-dojo-attach-event="ondijitclick:_onClick" class="dijitReset dijitInline dijitButtonNode">
                        <span aria-labelledby="dijit_form_Button_0_label" role="button" data-dojo-attach-point="titleNode,focusNode" class="dijitReset dijitStretch dijitButtonContents" tabindex="0" id="dijit_form_Button_0" style="-moz-user-select: none;"><span data-dojo-attach-point="iconNode" class="dijitReset dijitInline dijitIcon dijitNoIcon"></span><span class="dijitReset dijitToggleButtonIconChar">●</span><span data-dojo-attach-point="containerNode" id="dijit_form_Button_0_label" class="dijitReset dijitInline dijitButtonText">Share URL</span></span></span><input type="button" data-dojo-attach-point="valueNode" role="presentation" tabindex="-1" class="dijitOffScreen" value=""></span>
            </div>--%>
            <div id="initialExtent" onclick="javascript:backToInitialExtent()" title="Reset Map"></div>
        </div>
        <div id="gridTOC"></div>

    </div>

    <div id="legend">
        <div class="legendSymbol">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="8" cy="8" r="5" stroke="black" stroke-width="1" fill="blue" />
            </svg>
        </div>
        <div class="legendItemDesc">
            Design
        </div>
        <div style="clear: both;">
        </div>
        <div class="legendSymbol">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="8" cy="8" r="5" stroke="black" stroke-width="1" fill="red" />
            </svg>
        </div>
        <div class="legendItemDesc">
            Construction
        </div>
        <div style="clear: both;">
        </div>
        <div class="legendSymbol">
            <img src="construction.png" alt="Construction Area" style="width: 18px" />
        </div>
        <div class="legendItemDesc">
            Project Site
        </div>
        <div style="clear: both;">
        </div>
    </div>


    <div id="map"></div>





</asp:Content>
