function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    var home = new google.maps.LatLng(40.080710, -83.148510);
    var hospital = new google.maps.LatLng(40.101220, -83.165650);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const test = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            directionsService.route(
                {
                  origin: test,
                  destination: hospital,
                  travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                  if (status === "OK") {
                    document.querySelector(".eta").innerText = response.routes[0].legs[0].duration.text;
                    console.log(response.routes[0]);
                  } else {
                    window.alert("Directions request failed due to " + status);
                  }
                }
              );
        },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
  }