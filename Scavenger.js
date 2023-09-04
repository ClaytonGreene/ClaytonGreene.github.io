var map;
var infoWindow;
var PoleStar;
var kmlArray;

var ScavengerBounds = [[-81.20193230450714,43.01711090872867],
[-81.20856707045898,43.01521278328514],
[-81.20665078557194,43.01388528221463],
[-81.20660946098198,43.01373072470486],
[-81.20624595529051,43.01278705250148],
[-81.20561450518422,43.01166467666612],
[-81.20530989924498,43.01159406264444],
[-81.20325188775409,43.01215422591607],
[-81.20261774122207,43.01092507087702],
[-81.20211151867345,43.01072549012679],
[-81.20201467133148,43.01056701941992],
[-81.19568295295143,43.01237952694013],
[-81.19649731612542,43.01402719880028],
[-81.19692692319563,43.01489359344676],
[-81.19774596609125,43.01535704471073],
[-81.19907008152325,43.01556094469951],
[-81.20046405492005,43.01574515639107],
[-81.20108769090686,43.01598989258794],
[-81.20153496050838,43.01638206084757],
[-81.20193230450714,43.01711090872867]];


	function initMap() 
	{
	document.getElementById('KMLCheck').checked = false;
	kmlArray = [];
	
	infoWindow = new google.maps.InfoWindow();
	
	const locationButton = document.createElement("button");
	locationButton.textContent = "🎩 Lost? 🎩";
	locationButton.classList.add("custom-map-control-button");



	map = new google.maps.Map(document.getElementById('map'),{
	center: {lat: 43.012964455157665, lng: -81.20008793139037},		
	mapTypeId: 'satellite',
	zoom: 8,
	gestureHandling: "greedy",
	panControl: true,
	zoomControl: false,
	mapTypeControl: true,
	scaleControl: false,
	streetViewControl: false,
	overviewMapControl: false,
	rotateControl: true,
							//	restriction: {
							//	latLngBounds: {
							//	  north: 43.017864455157665,
							//	  south: 43.011004455157665,
							//	  east: -81.19008793139037,
							//	  west: -81.21008793139037,
							//},
//	},

	});
	var opt = { minZoom: 18, maxZoom: 30 };
	map.setOptions(opt);
	 
	map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toString(), null, 2)
    );
    infoWindow.open(map);
  });
  
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);


locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("This is where Google thinks you are.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


	
	LoadKML();

	
	
	}//End of Init
	
	function handleLocationError(browserHasGeolocation,infoWindow,pos)
	{
	infoWindow.setPosition(pos);
	infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

	
	function LoadKML() 
	{
		var tempArray = [];
		tempArray.push('https://ClaytonGreene.github.io/Scavenger.kmz?_=' + Date.now());
		//kml
		for (var u = 0; u < tempArray.length; ++u) {
			kmlLayer = new google.maps.KmlLayer(tempArray[u], {
				suppressInfoWindows: false,
				preserveViewport: true,
				zIndex: u,
			});
			
			kmlArray.push(kmlLayer);
		}
	}

	function LoadPolygon(shape)
	  {
		  var polygon = [];
		  
		  for(let i = 0; i < shape.length;++i)
		{	
		polygon.push({ lat: parseFloat(shape[i][1]), lng: parseFloat(shape[i][0]) 						
		});	
		}
		  
		  
		  const FanshaweBounds = new google.maps.Polygon({
			paths: polygon,
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeWeight: 5,
			fillColor: "#FF0000",
			fillOpacity: 0.0,
			});

		FanshaweBounds.setMap(map);
	  }
		
	function ToggleKML() {
    if (document.getElementById('KMLCheck').checked) {

        for (var i = 0; i < kmlArray.length; ++i) {

            kmlArray[i].setMap(kmlLayer.getMap() ? null : map);
        }
    }
    else {
        for (var i = 0; i < kmlArray.length; ++i) {
            kmlArray[i].setMap(null);
        }
    }


    return 0;
}
	
	