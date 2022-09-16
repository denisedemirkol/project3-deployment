
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

  console.log("Create Map");

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
      center: [-27, 153],
      zoom: 4,
      layers: [
        lightmap, 
        sites      
      ]
    });

    console.log("map definition is complete");


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

  console.log(sites.length);
  console.log("JS HERE");


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
  
         
  
          d3.json("http://127.0.0.1:5000/api/v0/statestats").then(
              data => {
  
                  const metadata = data;
                  Object.entries(metadata).forEach(([key, value]) => {
  
                    get_header(value['type']) ;
                    get_arrays(value['statecode'],value['rowcount'],value['type'] );
  
                  });
  
    
    
         console.log(v_header);   
  
      
  
  
  
   
         console.log( "v_nsw",v_nsw  );   
         console.log( "v_nt",v_nt );   
         console.log( "v_qld",v_qld );   
         console.log( "v_sa",v_sa  );   
         console.log( "v_tas",v_tas );   
         console.log( "v_vic",v_vic );   
         console.log( "v_wa",v_wa );   
  
  
        console.log("TEST")      
         
  
         var xtitle = 'Australia Healthsites Distirbution' 
  
          // // create data
          // var data = {
          //   title: xtitle,
          //   header: ['Name', 'Clinic', 'Dentist', 'Doctors', 'Hospital','Pharmacy'],
          //   rows: [
          //     ['Huawei', 59.1,56.6,66.8,56.2,10],           
          //     ['ACT',v_act['clinic'],v_act['dentist'],v_act['doctors'],v_act['hospital'],v_act['pharmacy']],
          //     ['Vivo', 23.9,27,31.3,31.5,10],
          //     ['Apple', 42,36.5,44.8,72.3,10],
          //     ['Samsung', 72,76.3,78.2,70.4,10],
          //     ['Xiaomi', 27.8,32.3,31.7,32.9,10],
          //     ['Oppo', 25.7,30.6,32.3,31.4,10],
          //     ['Others', 90.5,97.7,94.9,106.4,10],
          //   ]
  
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