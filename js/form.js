'use strict'

// Recupere les champs input
document.AddEventListenner("submit", form)

let form = function {
  document.write(document.getElementById('lattitude').value);
  document.write(document.getElementById('longitude').value);
}
