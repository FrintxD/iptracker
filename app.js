//Variables
var url;
var mapsUrl;
var button_click = document.getElementById('ip-button-submit');
var form = document.getElementById('form');
var ipAdress
var initalmap = document.getElementById('initalmap');
//Informations response.
var local = document.getElementById('location');
var ipResult = document.getElementById('ip-result');
var timezone = document.getElementById('timezone');
var isp = document.getElementById('isp');

//map
var map;

//Ip + URL.
function urlNewIp(){
    /*Para que o valor seja atualizado sempre que tenha um novo input text. É necessaário que a váriavel ip adress pegue seu valor nessa função! */
    ipAdress = document.getElementById('ip-adress').value;
    url = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_5XxBUSKU20isJKk8Ws16BnrKKGqLC&ipAddress=" + ipAdress;
    return url;
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
function ip_api_consume(newUrl){
    var country;
    var city;
    var timezone_res;
    var isp_res;

    var init = {
        method:"GET",
    }
    var http = fetch(url, init).then(function(data){
        return data.json();
    }).then((response)=>{
        country = response.location.country;
        city = response.location.city;
        timezone_res = response.location.timezone;
        isp_res = response.isp;
        //Inner Html information.
        ipResult.innerHTML = ipAdress;
        local.innerHTML = city + " - " + country;
        timezone.innerHTML = timezone_res;
        isp.innerHTML = isp_res;
        //map.
        initMap(response);
    })

}

//IP search.
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    initalmap.style.display = 'none';
    ip_api_consume(urlNewIp());
})