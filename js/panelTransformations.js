"use strict"

class Panel
{
    constructor(id)
    {
        this.elem = document.getElementById(id);
        this.masters = [];
        this.slaves = [];
    }
    addMaster(obj)
    {
        this.masters.push(obj);
    }
    addSlave(obj)
    {
        this.slaves.push(obj);
    }
    hasMasters()
    {
        return this.masters.length!=0;
    }
    hasSlaves()
    {
        return this.slaves.length!=0;
    }
    obeyYourMaster()
    {
        if(this.containsStyle("hidden")) return true;
        if(this.hasMasters()) {
            for(let i in this.masters)
            {
                if(!this.masters[i].containsStyle("hidden")) return false;
            }
        }
        return true;
    }
    aManChoosesaSlaveObeys()
    {
        if(this.hasSlaves()) {
            for(let i in this.slaves) {
                if(this.containsStyle("hidden")) {
                    if(this.slaves[i].containsStyle("cloaked")) {
                        if(this.slaves[i].obeyYourMaster()) {
                            this.slaves[i].addStyle("hidden");
                        }
                    }
                } else {
                    if(this.slaves[i].containsStyle("hidden")) {
                        this.slaves[i].addStyle("cloaked");
                    }
                    this.slaves[i].removeStyle("hidden");
                }
                this.slaves[i].saveConfig();
            }
        }
    }
    addStyle(id)
    {
        this.elem.classList.add(id);
    }
    removeStyle(id)
    {
        this.elem.classList.remove(id);
    }
    toggleStyle(id)
    {
        this.elem.classList.toggle(id);
    }
    containsStyle(id)
    {
        return this.elem.classList.contains(id);
    }
    saveConfig()
    {
        localStorage.setItem(this.elem.id, this.elem.classList);
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
        obj.toggleStyle("hidden");
        if(obj.hasMasters()) {
            if(!obj.containsStyle("hidden")) {
                obj.removeStyle("cloaked");
            }
        }
    } else {
        obj.toggleStyle("cloaked");
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

    tl.addMaster(t);
    tl.addMaster(l);
    tr.addMaster(t);
    tr.addMaster(r);
    bl.addMaster(b);
    bl.addMaster(l);
    br.addMaster(b);
    br.addMaster(r);
    t.addSlave(tl);
    t.addSlave(tr);
    b.addSlave(bl);
    b.addSlave(br);
    l.addSlave(tl);
    l.addSlave(bl);
    r.addSlave(tr);
    r.addSlave(br);

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
                        PANELS.array[i].addStyle("hidden");
                    } else {
                        PANELS.array[i].removeStyle("hidden");
                    }
                    PANELS.array[i].removeStyle("cloaked");
                }
                PANELS.saveConfigs();
            });

    PANELS.setConfigs();
}
document.addEventListener("DOMContentLoaded", function()
        {
            panelTransformReady();
        });
