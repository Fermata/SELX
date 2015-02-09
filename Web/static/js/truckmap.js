var trailer_arr = [];
var len = 10;

function initialize() {
	var geolocation = navigator.geolocation;
	geolocation.getCurrentPosition(showLocation, errorHandler);
}

function showLocation( position ) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var mapOptions = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var trailerIcon = new google.maps.MarkerImage("http://www.ridgebacklighting.com/wp-content/uploads/2014/09/trailer-icon.png", null, null, null, new google.maps.Size(25,25));
	var myIcon = new google.maps.MarkerImage("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png", null, null, null, new google.maps.Size(28,44));
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude,longitude),
		map: map,
		draggable: false,
		icon: myIcon,
		title:"Your location",
		animation: google.maps.Animation.DROP,
		zindex:2
	}).setMap(map);

	var scale = 0.006;
	for (var i = 0; i < len; i++) {
		trailer_arr.push({
			trailerId: i,
			latitude: latitude+(i+1)*getRandomArbitrary(-scale,scale),
			longitude: longitude+(i+1)*getRandomArbitrary(-scale,scale),
			Watth: getRandomArbitrary(0,1000),
			checked: false
		});
	}

	for (var i = 0; i < trailer_arr.length; i++) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(trailer_arr[i].latitude,trailer_arr[i].longitude),
			map: map,
			draggable: true,
			icon: trailerIcon,
			title: "trailer-"+i,
			animation: google.maps.Animation.DROP,
			zindex:1
		});
		marker.setMap(map);

		google.maps.event.addListener(marker, 'click', function() {
			var key = parseInt(this.title.split('-')[1])
			if(trailer_arr[key].checked)
				trailer_arr[key].checked=false;
			else
				trailer_arr[key].checked=true;

			console.log(trailer_arr[key]);

			calculateChecked();
		});
	}
}

function calculateChecked(){
	var totalWatth = 0;
	var html = "";
	var checked = 0;
	html += "<div>";
	for(var i=0; i<trailer_arr.length; i++){
		if(trailer_arr[i].checked){
			checked = 1;
			totalWatth += trailer_arr[i].Watth;

			html += "<div>Trailer #"
			html += (trailer_arr[i].trailerId+1)
			html += " generated <b>"
			html += trailer_arr[i].Watth.toFixed(2)
			html += "</b>Wh</div>"
		}
	}
	html += "</div>";
	html += "<div><hr/>"
	html += "Total <b>"+totalWatth.toFixed(2)+"</b>Wh energy generated"
	html += "</div>"
	if(checked)
		$("#selected_trucks").html(html)
	else
		$("#selected_trucks").html("No trucks selected")

	console.log(totalWatth);
}

function errorHandler( err ) {
	if (err.code == 1) {
	    // access is denied
	}
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}