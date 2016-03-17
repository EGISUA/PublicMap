<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CustomPrinting.aspx.cs" Inherits="Maps_New_CustomPrinting" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--CSS Files--%>
    <link rel="stylesheet" type="text/css" href="http://redbar.arizona.edu/sites/default/files/ua-banner/ua-web-branding/css/ua-web-branding.css">
    <link rel="stylesheet" type="text/css" href="css/style-print.css" />

    <%--JavaScript Files--%>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="http://redbar.arizona.edu/sites/default/files/ua-banner/ua-web-branding/js/ua-web-branding.js"></script>    
    <script src="js/Print.js"></script>
</head>
<body onload ="init()">
    <form id="form1" runat="server">  
    <div id="ua-web-branding-banner-v1" class="ua-wrapper bgDark blue-grad">
      <div class="ua-container">
        <a class="ua-home asdf" href="http://arizona.edu" title="The University of Arizona">
          <p>The University of Arizona</p>
        </a>
      </div>
    </div>

    <div id="main">
        <h1 class="header">University of Arizona Projects Map</h1>
        <div id="leftside">
            
            <div id="TOC">
                  
                <table id="TOC-Table">
                    <thead id="project-header"> 
                        <tr>
                            <th class="proj-num">Project #</th>
                            <th class="proj-title">Project Title</th>

                        </tr>

                    </thead>
                    <tbody>
                    </tbody>

                </table>    
            </div>
            <br />
            <div id="notes-div">
                <textarea  id="notes" value="" cols="1" onfocus="this.value=''">Enter custom notes here before printing. </textarea>
                
            </div>
        </div>
        <div id="map">
            <img id="mapImage" src="" />
        
        </div>
    </div>
    </form>
</body>
</html>
