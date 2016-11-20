// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

function initMap () {
  
  //Sets the height of the map canvas by getting the height of the ID body
  document.getElementById('map-canvas').style.height = document.getElementById('wlr-parent').clientHeight + '10px';
  
  //Riders Path
  var path = [
    {lat: 1,lng: 2},
    {lat: 0,lng: 0},
    {lat: 2,lng: 8}
  ];
  // map options
  var options = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 5,
      disableDefaultUI: true,
      scrollwheel: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    
    //What used to get the map-canvas element that would have already been created with the id map-canvas (which had to have it's height set)
    element = document.getElementById('map-canvas'),
    
    // map
    map = new google.maps.Map(element, options);

    // Create an ElevationService.
    var elevator = new google.maps.ElevationService;

  // Draw the path, using the Visualization API and the Elevation service.
  displayPathElevation(path, elevator, map);
  }
  
  function displayPathElevation(path, elevator, map) {
    
    // // Display a polyline of the elevation path.
        new google.maps.Polyline({
          path: path,
          strokeColor: '#0000CC',
          opacity: 0.4,
          map: map
        });

        // Create a PathElevationRequest object using this array.
        // Ask for 256 samples along that path.
        // Initiate the path request.
        elevator.getElevationAlongPath({
          'path': path,
          'samples': 256
        }, plotElevation);
      }

      // Takes an array of ElevationResult objects, draws the path on the map
      // and plots the elevation profile on a Visualization API ColumnChart.
      function plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation-chart');
        if (status !== 'OK') {
          // Show the error code inside the chartDiv.
          chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
              status;
          return;
        }
        
        // Create a new chart in the elevation_chart DIV.
        var chart = new google.visualization.ColumnChart(chartDiv);

        // Extract the data from which to populate the chart.
        // Because the samples are equidistant, the 'Sample'
        // column here does double duty as distance along the
        // X axis.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        // Draw the chart using the data within its DIV.
        chart.draw(data, {
          height: 100,
          legend: 'none',
          titleY: 'Elevation (m)'
        }
      );
      
      //Not workin
      //   (window).resize(function() {
      //   // (the 'map' here is the result of the created 'var map = ...' above)
      //   google.maps.event.trigger(elevation-chart, "resize");
      // });
  
       // This is the end 
    }
      
      
      
  