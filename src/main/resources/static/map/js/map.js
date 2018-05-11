/** Global namespace 'm4' for Metafour applications */
var m4 = m4 || {};
/** NetCourier namespace */
m4.nc = m4.nc || {};
/** UI element namespace */
m4.nc.sj = m4.nc.sj || {};

//Map Basic controller
m4.nc.sj.map;
m4.nc.sj.center = {lat: 34.30714386, lng: -9.31640625};
m4.nc.sj.initZoom = 3;
m4.nc.sj.scrollwheel = true;
m4.nc.sj.fullscreenControl = false;
m4.nc.sj.streetViewControl = false;
m4.nc.sj.mapTypeControl = true;
m4.nc.sj.trafficLayer = new google.maps.TrafficLayer();
m4.nc.sj.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
m4.nc.sj.labelIndex = 0;
m4.nc.sj.imageSource;

m4.nc.sj.driverdata;
m4.nc.sj.consignmentdata;

m4.nc.sj.driverMarker;
m4.nc.sj.driverMarkers = [];
m4.nc.sj.driverMarkerAnimation = google.maps.Animation.BOUNCE;
m4.nc.sj.currentDriverInfoWindow = null;

//initialize the map
m4.nc.sj.initMap = function() {
	m4.nc.sj.map = new google.maps.Map(document.getElementById('map'), {
		center: m4.nc.sj.center,
		scrollwheel: m4.nc.sj.scrollwheel,
		zoom: m4.nc.sj.initZoom,
		fullscreenControl: m4.nc.sj.fullscreenControl,
		streetViewControl: m4.nc.sj.streetViewControl,
		mapTypeControl: m4.nc.sj.mapTypeControl,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_CENTER
		}
	});

	m4.nc.sj.trafficLayer.setMap(m4.nc.sj.map);
	m4.nc.sj.imageSource = document.getElementById("imageUrl").getAttribute("href");

	//listener for driver marker animation
	google.maps.event.addListener(m4.nc.sj.map, 'bounds_changed', function(event) {
		if(m4.nc.sj.map.getBounds().contains(m4.nc.sj.driverMarker.position)){
			m4.nc.sj.driverMarkers.forEach(function(item, i){
				if(item.animating === true){
					item.setAnimation(m4.nc.sj.driverMarkerAnimation);
				}
			});
		};
	});
};

//create query to get drivers and consignments info
m4.nc.sj.queryFunction = function(){
	var drivers = [];
	var driver1 = {
		lat: 23.780040, lng: 90.446473
	};
	var driver2 = {
		lat: 41.270752, lng: 69.236743
	};
	drivers.push(driver1);
	drivers.push(driver2);
	
	m4.nc.sj.driverdata = drivers; 
	m4.nc.sj.driverFunction();
};

//create driver markes
m4.nc.sj.driverFunction = function(){
	
	m4.nc.sj.driverdata.forEach(function(driver, i){
		var driverInfoWindow = new google.maps.InfoWindow();

		var data = {
			'driver' : driver,
			'icon' : m4.nc.sj.imageSource + 'driver_icon.png'
		};
		var marker = m4.nc.sj.addMarker(data);
		if(i === 0){
			marker.setAnimation(m4.nc.sj.driverMarkerAnimation);
		}	
		m4.nc.sj.driverMarkers.push(marker);
	
		var driverString = 'Driver :' + i;
		driverInfoWindow.setContent(driverString);

		marker.addListener('click', function(){
			if(m4.nc.sj.currentDriverInfoWindow !== null){
				m4.nc.sj.currentDriverInfoWindow.close();
			}
			driverInfoWindow.open(m4.nc.sj.map, this);
			m4.nc.sj.currentDriverInfoWindow = driverInfoWindow;
		});
		
	});
};

m4.nc.sj.addMarker = function(data){
	m4.nc.sj.driverMarker = new google.maps.Marker({
		position: data.driver,
		map : m4.nc.sj.map,
		zIndex: 100,
		title : 'Driver',
		icon : data.icon
	});
	return m4.nc.sj.driverMarker;
};
