<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MegaCSSOnlyBubble.master" AutoEventWireup="true" CodeFile="map_sw.aspx.cs" Inherits="Maps_map_sw" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="PageHeader"><div id="BoxStylePageHeader">Southwest</div></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


<div class="BoxStyleContent">
<div align="center"><img src="const_map_sw.jpg" alt="Residence Life Building Renewal Phase 4" width="700" height="812" border="0" usemap="#Map" href="#" /></div>
<map name="Map" id="Map2">
    
        <area shape="circle" coords="610, 382, 20" 
        href="../projects/project.aspx?project=08-8826" 
        alt="BRYANT BANNISTER TREE-RING BUILDING" />
       
         <area shape="circle" coords="377, 461, 20"
        href="../projects/project.aspx?project=03-8526" 
        alt="Environment and Natural Resources Phase 2" />
</map>
</div>		
</asp:Content>

