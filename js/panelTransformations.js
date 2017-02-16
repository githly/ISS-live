"use strict"

class Panel
{
    constructor(id)
    {
        this.elem = document.getElementById(id);
        this.masters = [];
        this.slaves = [];
    }
}

let PANELS = new Array();

const searchObject = function(elem)
{
    for(let item in PANELS) {
        if(PANELS[item].elem == elem) return PANELS[item];
    }
}
const obeyYourMaster = function(obj)
{
    if(obj.elem.classList.contains("hidden")) return true;
    if(obj.masters.length!=0) {
        for(let item in obj.masters)
        {
            if(!obj.masters[item].elem.classList.contains("hidden")) return false;
        }
    }
    return true;
}
const moveYourSlaves = function(obj)
{
    if(obj.slaves.length!=0) {
        if(obj.elem.classList.contains("hidden")) {
            for(let item in obj.slaves) {
                if(obj.slaves[item].elem.classList.contains("cloaked")) {
                    if(obeyYourMaster(obj.slaves[item])) {
                        obj.slaves[item].elem.classList.add("hidden");
                    }
                }
            }
        } else {
            for(let item in obj.slaves) {
                if(obj.slaves[item].elem.classList.contains("hidden")) {
                    obj.slaves[item].elem.classList.add("cloaked");
                }
                obj.slaves[item].elem.classList.remove("hidden");
            }
        }
    }
}
const panelTransform = function(e)
{
    let obj = searchObject(e.target.parentNode);
    if(obeyYourMaster(obj)) {
        obj.elem.classList.toggle("hidden");
        if(obj.masters.length!=0) {
            if(obj.elem.classList.contains("hidden")) {
                obj.elem.classList.add("cloaked");
            } else {
                obj.elem.classList.remove("cloaked");
            }
        }
    } else {
        obj.elem.classList.toggle("cloaked");
    }
    moveYourSlaves(obj);
}
const panelTransformReady = function()
{
    let tl = new Panel("topleft");
    let tr = new Panel("topright");
    let bl = new Panel("bottomleft");
    let br = new Panel("bottomright");
    let t = new Panel("top");
    let b = new Panel("bottom");
    let l = new Panel("left");
    let r = new Panel("right");
    tl.masters = [t,l];
    tr.masters = [t,r];
    bl.masters = [b,l];
    br.masters = [b,r];
    t.slaves = [tl,tr];
    b.slaves = [bl,br];
    l.slaves = [tl,bl];
    r.slaves = [tr,br];
    PANELS = [tl,tr,bl,br,t,b,l,r];

    document.getElementById("topleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("topright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("top").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottom").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("left").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("right").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
}
document.addEventListener("DOMContentLoaded", function()
        {
            panelTransformReady();
        });
