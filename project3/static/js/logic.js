
/* **************************************************************************************
   MAP
 * ************************************************************************************** */


// Initialize all of the LayerGroups we'll be using
var layers = {
  PHARMACY: new L.LayerGroup(),
  DOCTOR: new L.LayerGroup(),
  CLINIC: new L.LayerGroup(),
  DENTIST: new L.LayerGroup(),
  HOSPITAL: new L.LayerGroup()
}



function createMap(sites) {


  // Define Variables for Tile Layers
  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });


  // Define baseMaps Object to Hold Base Layers
  var baseMaps = {
    "Light Map": lightmap,
    "Satellite": satelliteMap
  };


    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Healthsites": sites,
      "pharmacy"   : layers.PHARMACY,
      "doctor"     : layers.DOCTOR,
      "clinic"     : layers.CLINIC,
      "dentist"    : layers.DENTIST,
      "hospital"   : layers.HOSPITAL

    };

    console.log("Map and layers are set")


      // Create the map object with options
    var map = L.map("map", {
      center: [-23, 133],
      zoom: 4,
      layers: [
        lightmap, 
        sites      
      ]
    });



    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);


}



const url = "/api/v0/healthsites";
d3.json(url).then(
 data => {

  var sites = data;
  var siteMarkers = [];



  for (var index = 0; index < sites.length; index++) {

    
      vLat = sites[index]["lat"];
      vLon = sites[index]["lon"];
      vAmenity = sites[index]["loc_amenity"];
      vName    = sites[index]["loc_name"];


      var siteMarker = L.circleMarker([vLon,vLat])
      .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");
     
      siteMarkers.push(siteMarker);

      if (vAmenity === 'pharmacy'){

        var pharmacyMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        pharmacyMarker.addTo(layers['PHARMACY']);

      } 
      else if (vAmenity === 'doctors'){

        var doctorMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        doctorMarker.addTo(layers['DOCTOR']);

      } 

      else if (vAmenity === 'clinic'){

        var clinicMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        clinicMarker.addTo(layers['CLINIC']);

      } 

      
      else if (vAmenity === 'dentist'){

    
        var socialMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        socialMarker.addTo(layers['DENTIST']);

      } 

            
      else if (vAmenity === 'hospital'){

    
        var socialMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        socialMarker.addTo(layers['HOSPITAL']);

      } 


  
    

  }  
 
  createMap(L.layerGroup(siteMarkers));
  

}).catch(error => {
   console.log("error fetching url :", error);
});




/* **************************************************************************************
   MARIMEKKO CHART
 * ************************************************************************************** */

  let v_header = [];

  var v_act    = {};
  let v_nsw    = {};
  let v_nt     = {};
  let v_qld    = {};
  let v_sa     = {};
  let v_tas    = {};
  let v_vic    = {};
  let v_wa     = {};


  function get_header(p_type) {


    if (v_header.includes(p_type)==false){
      v_header.push(p_type);
    }
  
    return true;
  }
  
  function get_arrays (p_statecode, p_rowcount, p_type) {
  
    if (p_statecode == 'ACT') {
        v_act[p_type] = p_rowcount;
      }
  
    else if (p_statecode == 'NSW') {
      v_nsw[p_type] = p_rowcount;
    }
    else if (p_statecode == 'NT') {
      v_nt[p_type] = p_rowcount;
    }
    else if (p_statecode == 'QLD') {
      v_qld[p_type] = p_rowcount;
    }
    else if (p_statecode == 'SA') {
      v_sa[p_type] = p_rowcount;
    }
    else if (p_statecode == 'TAS') { 
      v_tas[p_type] = p_rowcount;
    }
    else if (p_statecode == 'VIC') {
      v_vic[p_type] = p_rowcount;
    }
    else if (p_statecode == 'WA') {
      v_wa[p_type] = p_rowcount;
    }
  
  
    return true;
  }
  
        
  anychart.onDocumentReady(function () {
  
         
          const anycharturl = "/api/v0/statestats";
          d3.json(anycharturl).then(
              data => {
  
                  const metadata = data;
                  Object.entries(metadata).forEach(([key, value]) => {
  
                    get_header(value['type']) ;
                    get_arrays(value['statecode'],value['rowcount'],value['type'] );
  
                  });

         
  
         var xtitle = 'Australia Healthsites Distirbution' 
  
  
        // create data
          var data = {
          title: xtitle,
          header: ['Name', 'Clinic', 'Dentist', 'Doctors', 'Hospital','Pharmacy'],
          rows: [     
            ['ACT',v_act['clinic'],v_act['dentist'],v_act['doctors'],v_act['hospital'],v_act['pharmacy']],
            ['NSW', v_nsw['clinic'],v_nsw['dentist'],v_nsw['doctors'],v_nsw['hospital'],v_nsw['pharmacy']],
            ['NT', v_nt['clinic'],v_nt['dentist'],v_nt['doctors'],v_nt['hospital'],v_nt['pharmacy']],
            ['QLD', v_qld['clinic'],v_qld['dentist'],v_qld['doctors'],v_qld['hospital'],v_qld['pharmacy']],
            ['SA', v_sa['clinic'],v_sa['dentist'],v_sa['doctors'],v_sa['hospital'],v_sa['pharmacy']],
            ['TAS', v_tas['clinic'],v_tas['dentist'],v_tas['doctors'],v_tas['hospital'],v_tas['pharmacy']],
            ['VIC', v_vic['clinic'],v_vic['dentist'],v_vic['doctors'],v_vic['hospital'],v_vic['pharmacy']],
            ['WA', v_wa['clinic'],v_wa['dentist'],v_wa['doctors'],v_wa['hospital'],v_wa['pharmacy']]  
          ]
  
          };
  
          // create a mekko (marimekko) chart
          var chart = anychart.mekko();
  
          // set the chart data
          chart.data(data);

  
          // enable the chart legend
          chart.legend(true);
  
          // set the chart container id
          chart.container('container');
  
          // draw the resulting marimekko chart
          chart.draw();
  
        });
  
      });   




/* **************************************************************************************
   GAUGE CHART
 * ************************************************************************************** */      

   
// ****************************************************************** //
// FUNCTION 1 - LOADING DEMOGRAPHICS 
// Called on window load and option change
// ****************************************************************** //

function populate_demographic_table(sampleid)
{
   
    let gaugeurl = "/api/v0/metaoperators";
    var data = d3.json(gaugeurl).then(data => {    
    
        const metadata        = data;      
        const filteredData    = metadata.filter(sampledtl => sampledtl.loc_name == sampleid)[0]   
    
        const demographicpanel = d3.select('#sample-metadata')
        demographicpanel.html('');  
    
         
        Object.entries(filteredData).forEach(([key, value]) => {

              var label ="";
              var display_value = "";
              
              if (key == 'completeness')
                 label = "Completeness";
              else if (key == 'loc_amenity')  
                 label = "Amenity";
              else if (key == 'access_hours')  
                 label = "Access Hours";   
              else if (key == 'addr_postcode')  
                 label = "Postcode";  
              else if (key == 'state')  
                 label = "State";       
              else if (key == 'meta_operator')  
                 label = "Operator";     
              else if (key == 'meta_speciality')  
                 label = "Speciality";                                        
              else if (key == 'meta_emergency')  
                 label = "Emergency";  
              else if (key == 'contact_url')  
                 label = "URL";  
              else if (key == 'meta_operator_type')               
                 label = "Operator Type";   
              else if (key == 'contact_phone')               
                 label = "Contact Phone";                   
              else if (key == 'meta_wheelchair')               
                 label = "Wheelchair Access";      
              else if (key == 'address')               
                 label = "Address";                                                       
              else
                 label = "";  

               
               if (value == null)
                  display_value = "-";
               else
                  display_value = value;    
              
               if  (label != "")
                   demographicpanel.append("h6").text(`${label}: ${display_value}`);              
        });    
        

    });
}


function build_graphs(sampleid)
{


    let gaugeurl = "/api/v0/metaoperators";
    let data = d3.json(gaugeurl).then(data => {    

        let metadata = data;
    
        let filteredSample      = metadata.filter(sampledtl => sampledtl.loc_name == sampleid)[0]  // Arrow function to extract the data
        let completeness        = parseInt(filteredSample.completeness)

       
    // ************************* GAUGE GRAPH ****************************** //


    function build_gauge_graph(sampleid){




        // Trig to calc meter point
        var degrees = (180 - (completeness*3.5)),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type  : 'scatter',
                      x     : [0], y:[0],
                      marker: {size: 28, color:'850000'},
                      showlegend: false,
                      name      : 'speed',
                      text      : completeness,
                      hoverinfo : 'text+name'},
                    { values    : [50/5, 50/5, 50/5, 50/5, 50/5,  50],
                      rotation  : 90,
                      text      : ['40+', '30-40', '20-30', '10-20','0-10',''],
                      textinfo  : 'text',
                      textposition :'inside',
                      marker       : {colors:['rgba(14, 100, 0, .5)', 
                                              'rgba(110, 154, 22, .5)',
                                              'rgba(130, 190, 35, .5)',
                                              'rgba(202, 209, 95, .5)',
                                              'rgba(232, 226, 202, .5)',
                                              'rgba(255, 255, 255, 0)']},
                      labels      : ['40+', '30-40', '20-30', '10-20','0-10',''],
                      hoverinfo   : 'label',
                      hole        : .5,
                      type        : 'pie',
                      showlegend  : false
                    }];

        var layout = {shapes:[{ type: 'path',
                                path: path,
                                fillcolor: '850000',
                                line: {color: '850000'}}],
                       title    : '<b>Completeness</b> <br> how comprehensive the information whether <br> all of the data we need is available and accurate <br><br><br>  ',
                       height   : 500,
                       width    : 500,
                       xaxis    : {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
                       yaxis    : {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
                    };

        Plotly.newPlot('gauge', data, layout);

    }    



    // ************************************************************
    // CALLING GRAPHS

        build_gauge_graph(sampleid);
    }) 
}   



   
   



function optionChanged(sampleid)
{
    
    populate_demographic_table(sampleid)
    build_graphs(sampleid)

    
};    


// ****************************************************************** //
// Read sample.json data and load options
// Windows load action
// ****************************************************************** //



window.onload = function() {

    let gaugeurl = "/api/v0/metaoperators";
    let data = d3.json(gaugeurl).then(data => {
        
  


         const names     = []; 

         for (var index = 0; index < data.length; index++) {

             names.push(data[index].loc_name)
    
         }    

        // // dropDown button
         let dropDown = d3.select('#selDataset')
        
        // // dropDown.on('change', handleChange)
         names.forEach(name => {
             dropDown.append('option').text(name).property('value', name);
         });
         
         sampleid = "Callaghan Campus Pharmacy"
         populate_demographic_table(sampleid) // Load initial data for test id, after the file is loaded
         build_graphs(sampleid)
        

    })

   
}  


