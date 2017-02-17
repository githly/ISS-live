'use strict'
// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(event) {

  let latitude =0;
  let longitude = 0;
// ecoute la validation du formulaire
  document.getElementById('form').addEventListener("submit", function (evt){

    latitude = document.getElementById('latitude').value;// Recupere la latitude
    longitude = document.getElementById('longitude').value; // Recupere la longitude
    console.log(latitude);
    console.log(longitude);

  });// End Submit
  // tableau double dimension
  let getPlaces = function () {
    // INitialise les paramètres de l'objet
        let places = function (name, latitude, longitude){
          this.name=name;
          this.latitude=latitude;
          this.longitude=longitude;
        }
        // definir les objets
        let MARSEILLE = new places("MARSEILLE", 12345, 5678);
        let NY = new places("NY", 8745, 35689);
        let PERTH = new places("PERTH", 8745, 35689);
        let PAP = new places("PAP", 8745, 35689);
        let BA = new places("BA", 8745, 35689);
        let CC = new places("CC", 8745, 35689);
        // Ajouter les objets au tableau
        let selectList = [MARSEILLE, NY, PERTH, PAP, BA, CC];
        return selectList;
      }
      // ecoute l'élement select et si il change ...
document.getElementById('select').addEventListener("change", function (evt){


let select = document.getElementById('select');
let index = select.selectedIndex;
let inputLatitude = document.getElementById('latitude');// Recupere la latitude
let inputLongitude = document.getElementById('longitude'); // Recupere la longitude
console.log(select.options[index].value);
console.log(index);
console.log();
let place = getPlaces();
  if (select.options[index].value){ // si tt les autres cas
    console.log(place[index-1]);
    inputLatitude.value = place[index-1].latitude;
    inputLongitude.value = place[index-1].longitude;
  }else { // SI on est sur index 0 ou chaine vide

  }

}); // end CHange

  // clear le formulaire
  document.getElementById('clear').addEventListener("click", function (evt){
    document.getElementById('form').reset();
  });



}); // End DOMContentLoaded
