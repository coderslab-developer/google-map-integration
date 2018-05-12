/** Global namespace 'm4' for Metafour applications */
var m4 = m4 || {};
/** NetCourier namespace */
m4.nc = m4.nc || {};
/** UI element namespace */
m4.nc.sj = m4.nc.sj || {};

//Map Basic controller
m4.nc.sj.map;
m4.nc.sj.center = {lat: 23.798752, lng: 90.413501};  //23.798752, 90.413501  Dhaka
m4.nc.sj.initZoom = 7;
m4.nc.sj.scrollwheel = true;
m4.nc.sj.fullscreenControl = false;
m4.nc.sj.streetViewControl = false;
m4.nc.sj.mapTypeControl = true;
m4.nc.sj.trafficLayer = new google.maps.TrafficLayer();
m4.nc.sj.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
m4.nc.sj.labelIndex = 0;
m4.nc.sj.imageSourceUrl;
m4.nc.sj.siteRootUrl;
m4.nc.sj.distanceData;

m4.nc.sj.driverdata;
m4.nc.sj.consignmentdata;

m4.nc.sj.driverMarker;
m4.nc.sj.driverMarkers = [];
m4.nc.sj.jobMarkers = [];
m4.nc.sj.driverMarkerAnimation = google.maps.Animation.BOUNCE;

m4.nc.sj.currentDepotInfoWindow = null;
m4.nc.sj.currentDriverInfoWindow = null;
m4.nc.sj.currentJobInfoWindow = null;

m4.nc.sj.allDrivers = [];
m4.nc.sj.allJobs = [];

m4.nc.sj.distanceService = new google.maps.DistanceMatrixService;
m4.nc.sj.directionDisplay;
m4.nc.sj.directionService;

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
	m4.nc.sj.imageSourceUrl = document.getElementById("imageUrl").getAttribute("href");
	m4.nc.sj.siteRootUrl = document.getElementById("rootUrl").getAttribute("href");
	m4.nc.sj.allDrivers = [];
	m4.nc.sj.allJobs = [];
	m4.nc.sj.driverMarkers = [];
	m4.nc.sj.jobMarkers = [];

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
	$.ajax({
		contentType : "application/json",
		method : "GET",
		async: false,
		url : m4.nc.sj.siteRootUrl + "map/map",
		success: function(data){
			m4.nc.sj.driverdata = data.driver;
			m4.nc.sj.consignmentdata = data.job;
		}
	})

	m4.nc.sj.depotFunction();
	m4.nc.sj.driverFunction();
	m4.nc.sj.jobFunction();
};

//create depot marker
m4.nc.sj.depotFunction = function(){
	var depotInfoWindow = new google.maps.InfoWindow();

	var data = {
		'lat' : m4.nc.sj.center.lat,
		'lng' : m4.nc.sj.center.lng,
		'icon' : m4.nc.sj.imageSourceUrl + 'm1.png'
	}

	var depotString = '<h3><img src="'+ m4.nc.sj.imageSourceUrl +'depot.png"/> Depot: Sundorban Courier Service</h3>';

	depotInfoWindow.setContent(depotString);

	var marker = m4.nc.sj.addMarker(data);
	marker.addListener('click', function(){
		if(m4.nc.sj.currentDepotInfoWindow !== null){
			m4.nc.sj.currentDepotInfoWindow.close();
		}
		depotInfoWindow.open(m4.nc.sj.map, this);
		m4.nc.sj.currentDepotInfoWindow = depotInfoWindow;
	});
}

//create driver markes
m4.nc.sj.driverFunction = function(){
	m4.nc.sj.driverdata.forEach(function(driver, i){
		//console.log(driver);
		var driverInfoWindow = new google.maps.InfoWindow();

		var data = {
			'lat' : driver.latitude,
			'lng' : driver.longitude,
			'icon' : m4.nc.sj.imageSourceUrl + 'driver_icon.png'
		};
		var marker = m4.nc.sj.addMarker(data);
		marker.setAnimation(m4.nc.sj.driverMarkerAnimation);

		var positionA = {lat : Number(driver.latitude) , lng: Number(driver.longitude)};
		var positionB = {lat : Number(m4.nc.sj.center.lat), lng : Number(m4.nc.sj.center.lng)};

		var driverString = 	'<h3><img src="' + m4.nc.sj.imageSourceUrl + 'd1.png"/>' + ' Driver : ' + driver.userName + '</h3>'+
							'<p><b>Vehicle Type: </b>' + driver.vehicleType + '</p>';
		
		m4.nc.sj.distanceCalculate({'positionA' : positionA, 'positionB' : positionB, 'infoString' : driverString, 'infoWindow': driverInfoWindow });

		// driverInfoWindow.setContent(driverString);

		marker.addListener('click', function(){
			if(m4.nc.sj.currentDriverInfoWindow !== null){
				m4.nc.sj.currentDriverInfoWindow.close();
			}
			driverInfoWindow.open(m4.nc.sj.map, this);
			m4.nc.sj.currentDriverInfoWindow = driverInfoWindow;
		});

		m4.nc.sj.allDrivers.push(driver);
		m4.nc.sj.driverMarkers.push(marker);
	});
};

//create job markers
m4.nc.sj.jobFunction = function(){
	m4.nc.sj.consignmentdata.forEach(function(job, i){
		//console.log(job);
		var jobInfoWindow = new google.maps.InfoWindow();

		var jobString = '<h3><img src="' + m4.nc.sj.imageSourceUrl + 'job_icon.png"/> ' + job.collectionAddress.company + '</h3>' +
						'<p><b>HAEB: </b> ' + job.hawbNumber + '</p>' +
						'<p><b>Country: </b> ' + job.collectionAddress.country + '</p>' + 
						'<p><b>City: </b> ' + job.collectionAddress.city + '</p>';

		var jobPosition = {lat : Number(job.collectionAddress.latitude) , lng: Number(job.collectionAddress.longitude)};
		//m4.nc.sj.closestDriver({'positionA' : jobPosition, 'infoWindow' : jobInfoWindow, 'infoString' : jobString});
		var closestMarker = m4.nc.sj.closestMarkerUsingHaversineFormula({'positionA' : jobPosition, 'markers' :  m4.nc.sj.driverMarkers});
		m4.nc.sj.allDrivers.forEach(function(driver, i){
			if(Number(driver.latitude) === closestMarker.position.lat()){
				var positionB = {lat : Number(driver.latitude), lng : Number(driver.longitude)};
				jobString += 	'<p>'+
									'<b>Closest driver: </b>' + driver.userName + 
									'<button id="' + job.hawbNumber + '" onClick="m4.nc.sj.showTwoMarkerRelation(' + jobPosition.lat + ',' +  jobPosition.lng + ',' + positionB.lat + ',' + positionB.lng + ',' + job.hawbNumber + ')" class="showRelation pull-right">Show Relation</button>'+
								'</p>';
				
				m4.nc.sj.distanceCalculate({'positionA' : jobPosition, 'positionB' : positionB, 'infoString': jobString, 'infoWindow': jobInfoWindow});
			}
		});

		var data = {
			'lat' : job.collectionAddress.latitude,
			'lng' : job.collectionAddress.longitude,
			'icon' : m4.nc.sj.imageSourceUrl + 'job_icon.png'
		};

		var marker = m4.nc.sj.addMarker(data);

		marker.addListener('click', function(){
			if(m4.nc.sj.currentJobInfoWindow !== null){
				m4.nc.sj.currentJobInfoWindow.close();
			}
			jobInfoWindow.open(m4.nc.sj.map, this);
			m4.nc.sj.currentJobInfoWindow = jobInfoWindow;
		});

		m4.nc.sj.allJobs.push(job);
		m4.nc.sj.jobMarkers.push(marker);
	})
}

//marker factory
m4.nc.sj.addMarker = function(data){
	m4.nc.sj.driverMarker = new google.maps.Marker({
		position: {lat: Number(data.lat), lng: Number(data.lng)},
		map : m4.nc.sj.map,
		zIndex: 100,
		icon : data.icon
	});
	return m4.nc.sj.driverMarker;
};

//calculate distance between two positions
m4.nc.sj.distanceCalculate = function(data){
	m4.nc.sj.distanceService.getDistanceMatrix({
		origins : [data.positionA],
		destinations : [data.positionB],
		travelMode: 'DRIVING',
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	}, function(response, status){
		if(status !== 'OK'){
			console.log('Error was' + status)
		}else{
			var distance = response.rows[0].elements[0].distance;
			var duration = response.rows[0].elements[0].duration;

			if(data.infoString !== undefined){
				data.infoString += 	'<p><b>Distance: </b>' + distance.text + '</p>' + 
									'<p><b>Duration: </b>' + duration.text + '</p>';
			}
			if(data.infoWindow !== undefined){
				data.infoWindow.setContent(data.infoString);
			}
		}
	});
}

//calculate closest driver
m4.nc.sj.closestDriver = function(data){

	var closestDriverArray = new Array();

	m4.nc.sj.allDrivers.forEach(function(driver, i){
		var positionB = {lat : Number(driver.latitude), lng : Number(driver.longitude)};

		m4.nc.sj.distanceService.getDistanceMatrix({
			origins : [data.positionA],
			destinations : [positionB],
			travelMode: 'DRIVING',
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		}, function(response, status){
			if(status !== 'OK'){
				console.log('Error was' + status)
			}else{
				var distance = response.rows[0].elements[0].distance;
				var duration = response.rows[0].elements[0].duration;

				var closestDriver = {
					'name' : driver.userName,
					'value' : distance.value,
					'distance' : distance.text,
					'duration' : duration.text
				}

				if(closestDriverArray.length === 0){
					closestDriverArray.push(closestDriver);
				}else{
					if(distance.value < Number(closestDriverArray[0].value)){
						closestDriverArray = [];
						closestDriverArray.push(closestDriver);
					}
				}

				if(m4.nc.sj.allDrivers.length === (i + 1)){
					data.infoString += 	'<p><b>Closest driver: </b>' + closestDriverArray[0].name + ' <button class="showRelation pull-right">Show Relation</button></p>' +
										'<p><b>Distance: </b>' + closestDriverArray[0].distance + '</p>' +
										'<p><b>Duration: </b>' + closestDriverArray[0].duration + '</p>';

					data.infoWindow.setContent(data.infoString);
				}
			}
		});
	});
}


//Closest Marker HaversineFormula
m4.nc.sj.rad = function(x){
	return x*Math.PI/180;
}
m4.nc.sj.closestMarkerUsingHaversineFormula = function(data){
	//console.log(data);

	var lat = data.positionA.lat;
	var lng = data.positionA.lng;
	var R = 6371; // radius of earth in km
	var distances = [];
	var closest = -1;
	for( i=0; i < data.markers.length; i++ ) {
		var mlat = data.markers[i].position.lat();
		var mlng = data.markers[i].position.lng();
		var dLat  = m4.nc.sj.rad(mlat - lat);
		var dLong = m4.nc.sj.rad(mlng - lng);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(m4.nc.sj.rad(lat)) * Math.cos(m4.nc.sj.rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		distances[i] = d;
		if ( closest == -1 || d < distances[closest] ) {
			closest = i;
		}
	}

	return data.markers[closest];
}

//Two marker relation
m4.nc.sj.showTwoMarkerRelation = function(lat1, lng1, lat2, lng2, hawb){
	if($(hawb).hasClass('hideRelation')){
		$(hawb).html("Show relation");
		$(hawb).removeClass('hideRelation');
		$(hawb).addClass('showRelation');
		if(m4.nc.sj.directionDisplay != null){
			m4.nc.sj.directionDisplay.setMap(null);
			m4.nc.sj.directionDisplay = null;
		}
		return;
	};

	if(m4.nc.sj.directionDisplay != null){
		m4.nc.sj.directionDisplay.setMap(null);
		m4.nc.sj.directionDisplay = null;
	};

	m4.nc.sj.directionDisplay = new google.maps.DirectionsRenderer;
	m4.nc.sj.directionService = new google.maps.DirectionsService;

	m4.nc.sj.directionService.route({
		origin: {lat : Number(lat1), lng : Number(lng1)},
		destination: {lat : Number(lat2), lng : Number(lng2)},
		travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			m4.nc.sj.directionDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});

	m4.nc.sj.directionDisplay.setMap(m4.nc.sj.map);
	m4.nc.sj.directionDisplay.setOptions({ suppressMarkers : true, zoom : 7});

	$(hawb).html("Hide relation");
	$(hawb).removeClass('showRelation');
	$(hawb).addClass('hideRelation');
}

