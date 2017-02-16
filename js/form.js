'use strict'

// ecoute la validation du formulaire
document.AddEventListenner("submit", form)

let form = function {
  e.PreventDefault();
  let lattitude = document.write(document.getElementById('lattitude').value); // Recupere la lattitude
  let longitude = document.write(document.getElementById('longitude').value); // Recupere la longitude
}
