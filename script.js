"use strict";
const ip = document.querySelector(".ip");
const loc = document.querySelector(".location");
const time = document.querySelector(".time");
const isp = document.querySelector(".isp");
const input = document.querySelector("input");
const arrow = document.querySelector(".arrow");

//Making map and tiles
var map = L.map("map").setView([0, 0], 1);

L.tileLayer(
  `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=1hk3KkQT8DXtMfnUuAiC`,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

//Current position
let marker;
navigator.geolocation.getCurrentPosition((position) => {

//Making a marker with a custom icon
const isicon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize:     [30, 38], // size of the icon
  iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
 });
 marker=L.marker([position.coords.latitude, position.coords.longitude],{icon:isicon}).addTo(map);

});


async function address(val) {
  try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Rsbepcp6YBcc6Bql2wCG6LT0VQJqb&ipAddress=${val}`);
      const users = await response.json();
        if (users.code===422) {
            throw new Error(`${users.messages}`);

        }
    ip.innerHTML = `${users.ip}`;
    loc.innerHTML = `${users.location.region},${users.location.country}-${users.location.postalCode}`;
    time.innerHTML = `UTC${users.location.timezone}`;
    isp.innerHTML = `${users.isp}`;
    marker.setLatLng([users.location.lat, users.location.lng]);
  } catch (err) {
      alert(err)
    // console.log(err);
  }
}

arrow.addEventListener("click", function (e) {
  address(input.value);
});

document.addEventListener('keydown',function(e){
    if(e.key==='Enter') address(input.value)
})

