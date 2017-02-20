'use strict'

let SimplonLatitude = 43.342396;
let SimplonLongitude = 5.437168;

let latitude = SimplonLatitude;
let longitude = SimplonLongitude;
// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(event) {


    // ecoute la validation du formulaire
    document.getElementById('form').addEventListener("submit", function (evt){

        latitude = document.getElementById('latitude').value;// Recupere la latitude
        longitude = document.getElementById('longitude').value; // Recupere la longitude
        console.log(latitude);
        console.log(longitude);

    });// End Submit

    const PLACES = buildPlaces();
    for(let i in PLACES) {
        document.getElementById("countries").options.add(new Option(PLACES[i].country, i));
    }


    document.getElementById('countries').addEventListener("change", function (e){
        let list = e.target;
        let modelList = document.getElementById("cities");
        while(modelList.options.length) {
            modelList.remove(0);
        }
        modelList.options.add(new Option("-- City --", "city"));

        let sel = list.options[list.selectedIndex].value;
        if(sel != "country") {
            let cities = PLACES[sel].cities;
            if (cities) {
                var city;
                for (let i in cities) {
                    city = new Option(cities[i].city, i);
                    modelList.options.add(city);
                }
            }
        } else {
            document.getElementById("latitude").value = SimplonLatitude;
            document.getElementById("longitude").value = SimplonLongitude;
        }
    });// End Change
    document.getElementById('cities').addEventListener("change", function (e)
            {
                let list = document.getElementById("countries");
                let listC = document.getElementById("cities");
                let CountrySelect = list.options[list.selectedIndex].value;
                let CitySelect = listC.options[listC.selectedIndex].value;
                if (CitySelect != "city"){
                    let lat = PLACES[CountrySelect].cities[CitySelect].lat;
                    let lon = PLACES[CountrySelect].cities[CitySelect].lon;
                    document.getElementById("latitude").value = lat;
                    document.getElementById("longitude").value = lon;	
                } else {
                    document.getElementById("latitude").value = SimplonLatitude;
                    document.getElementById("longitude").value = SimplonLongitude;
                }

            });// End Change

    // clear le formulaire
    document.getElementById('clear').addEventListener("click", function (evt){
        document.getElementById('form').reset();
    });



}); // End DOMContentLoaded
