'use strict'
// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(event) {

  let lattitude =0;
  let longitude = 0;
// ecoute la validation du formulaire
  document.getElementById('form').addEventListener("submit", function (evt){

    lattitude = document.getElementById('lattitude').value;// Recupere la lattitude
    longitude = document.getElementById('longitude').value; // Recupere la longitude
    console.log(lattitude);
    console.log(longitude);

    /*if {

    }*/
  });

  // clear le formulaire
  document.getElementById('clear').addEventListener("click", function (evt){
    document.getElementById('form').reset();
  });



}); // End DOMContentLoaded
