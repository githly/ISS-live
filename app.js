"use strict"
let ready = function(){
  LeftClick
}

let WideDiv = document.getElementsByClassName("wide");
let TopDiv = document.getElementsByClassName("top");
let RightDiv = document.getElementsByClassName("right");
let BottomDiv = document.getElementsByClassName("bottom");
let LeftDiv = document.getElementsByClassName("left");
let div = document.getElementsByTagName("div")

let TopArray = 0;
let RightArray = 0;
let BottomArray = 0;
let LeftArray = 0;

document.getElementsByClassName("left").addEventListener("click", function( event ) {
  LeftArray+= 1
  if (LeftArray = 3){
    LeftDiv.style.display == none;
  }
})

document.addEventListener(DOMLoaded, ready)
