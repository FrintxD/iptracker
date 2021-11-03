//Variables
var geo_API_url;
var ipAddress_form = document.getElementById('form');
var homeMap = document.getElementById('homemap');
//Informations response.
var local = document.getElementById('location');
var ipResult = document.getElementById('ip-result');
var timezone = document.getElementById('timezone');
var isp = document.getElementById('isp');

//map
var map;

//Ip + URL.
function geoAPIvalidUrl(){
    /*Para que o valor seja atualizado sempre que tenha um novo input text. É necessaário que a váriavel ip adress pegue seu valor nessa função! */
    var ipAdress = document.getElementById('ip-adress').value;
    geo_API_url = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_HGy8rJadbSa7uV5cJqQfzWfExoF1k&ipAddress=" + ipAdress;
    return geo_API_url;
}

//Google map API consume.
function initMap(resp) {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: {
          lat:resp.location.lat,
          lng:resp.location.lng,
      }
    });
}


//Geographic API consume.
function geo_api_consume(urlWithInputIp){
    var country;
    var city;

    var init = {
        method:"GET",
    }
    var http = fetch(urlWithInputIp, init).then(function(data){
        return data.json();
    }).then((response)=>{
        country = response.location.country;
        city = response.location.city;
        //Inner Html information.
        ipResult.innerHTML = ipAdress;
        local.innerHTML = city + " - " + country;
        timezone.innerHTML = response.location.timezone;
        isp.innerHTML = response.isp;
        //map.
        initMap(response);
    })

}

//IP search.
ipAddress_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    homemap.style.display = 'none';
    geo_api_consume(geoAPIvalidUrl());
})
