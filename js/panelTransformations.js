"use strict"

class Panel
{
    constructor(id)
    {
        this.elem = document.getElementById(id);
        this.masters = [];
        this.slaves = [];
    }
    setMaster(obj)
    {
        this.masters.push(obj);
    }
    setSlave(obj)
    {
        this.slaves.push(obj);
    }
    obeyYourMaster()
    {
        if(this.elem.classList.contains("hidden")) return true;
        if(this.masters.length!=0) {
            for(let i in this.masters)
            {
                if(!this.masters[i].elem.classList.contains("hidden")) return false;
            }
        }
        return true;
    }
    aManChoosesaSlaveObeys()
    {
        if(this.slaves.length!=0) {
            if(this.elem.classList.contains("hidden")) {
                for(let i in this.slaves) {
                    if(this.slaves[i].elem.classList.contains("cloaked")) {
                        if(this.slaves[i].obeyYourMaster()) {
                            this.slaves[i].elem.classList.add("hidden");
                        }
                    }
                }
            } else {
                for(let i in this.slaves) {
                    if(this.slaves[i].elem.classList.contains("hidden")) {
                        this.slaves[i].elem.classList.add("cloaked");
                    }
                    this.slaves[i].elem.classList.remove("hidden");
                }
            }
        }
    }
}
class Panels
{
    constructor()
    {
        this.array = [];
    }
    insert(obj)
    {
        this.array.push(obj);
    }
    search(obj)
    {
        for(let i in this.array) {
            if(this.array[i].elem == obj) return this.array[i];
        }
    }
    saveConfig(obj)
    {
        localStorage.setItem(obj.id, obj.classList);
    }
    saveConfigs()
    {
        for(let i in this.array) {
            this.saveConfig(this.array[i].elem);
        }
    }
    setConfig(obj)
    {
        obj.classList = localStorage.getItem(obj.id) || "panel";
    }
    setConfigs()
    {
        for(let i in this.array) {
            this.setConfig(this.array[i].elem);
        }
    }
}
let PANELS = new Panels();

const panelTransform = function(e)
{
    let obj = PANELS.search(e.target.parentNode);
    if(obj.obeyYourMaster()) {
        obj.elem.classList.toggle("hidden");
        if(obj.masters.length!=0) {
            if(!obj.elem.classList.contains("hidden")) {
                obj.elem.classList.remove("cloaked");
            }
        }
    } else {
        obj.elem.classList.toggle("cloaked");
    }
    obj.aManChoosesaSlaveObeys();
    PANELS.saveConfig(obj.elem);
}
const panelTransformReady = function()
{
    let tl = new Panel("topleft");
    PANELS.insert(tl);
    let tr = new Panel("topright");
    PANELS.insert(tr);
    let bl = new Panel("bottomleft");
    PANELS.insert(bl);
    let br = new Panel("bottomright");
    PANELS.insert(br);
    let t = new Panel("top");
    PANELS.insert(t);
    let b = new Panel("bottom");
    PANELS.insert(b);
    let l = new Panel("left");
    PANELS.insert(l);
    let r = new Panel("right");
    PANELS.insert(r);

    tl.setMaster = t;
    tl.setMaster = l;
    tr.setMaster = t;
    tr.setMaster = r;
    bl.setMaster = b;
    bl.setMaster = l;
    br.setMaster = b;
    br.setMaster = r;
    t.setSlave = tl;
    t.setSlave = tr;
    b.setSlave = bl;
    b.setSlave = br;
    l.setSlave = tl;
    l.setSlave = bl;
    r.setSlave = tr;
    r.setSlave = br;

    document.getElementById("topleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("topright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("top").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottom").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("left").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("right").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);

    document.getElementById("transformButton").addEventListener("click", function(e)
            {
                e.target.classList.toggle("active");
                for(let i in PANELS.array) {
                    if(e.target.classList.contains("active")) {
                        PANELS.array[i].elem.classList.add("hidden");
                    } else {
                        PANELS.array[i].elem.classList.remove("hidden");
                        PANELS.array[i].elem.classList.remove("cloaked");
                    }
                }
                PANELS.saveConfigs();
            });

    PANELS.setConfigs();
}
document.addEventListener("DOMContentLoaded", function()
        {
            panelTransformReady();
        });
