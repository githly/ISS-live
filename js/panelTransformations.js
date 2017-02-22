"use strict"

class Panel
{
    constructor(id)
    {
        this.elem = document.getElementById(id);
        this.masters = [];
        this.slaves = [];
        this.elem.getElementsByClassName("transformButton")[0].addEventListener("click", this.moveYourAssSoldier);
    }
    addMaster(obj)
    {
        this.masters.push(obj);
    }
    addSlave(obj)
    {
        this.slaves.push(obj);
    }
    addMasters()
    {
        for(let i in arguments) {
            this.addMaster(arguments[i]);
        }
    }
    addSlaves()
    {
        for(let i in arguments) {
            this.addSlave(arguments[i]);
        }
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
                            this.slaves[i].removeStyle("cloaked");
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
    moveYourAssSoldier(e)
    {
        this.classList.toggle("active");
        let obj = PANELS.search(this.parentNode);
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
        obj.saveConfig();
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
    loadConfig()
    {
        this.elem.classList = localStorage.getItem(this.elem.id) || "panel";
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
    insertAll()
    {
        for(let i in arguments) {
            this.insert(arguments[i]);
        }
    }
    search(obj)
    {
        for(let i in this.array) {
            if(this.array[i].elem == obj) return this.array[i];
        }
        return null;
    }
    saveConfigs()
    {
        for(let i in this.array) {
            this.array[i].saveConfig();
        }
    }
    loadConfigs()
    {
        for(let i in this.array) {
            this.array[i].loadConfig();
        }
    }
}
let PANELS = new Panels();

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

    tl.addMasters(t,l);
    tr.addMasters(t,r);
    bl.addMasters(b,l);
    br.addMasters(b,r);
    t.addSlaves(tl,tr);
    b.addSlaves(bl,br);
    l.addSlaves(tl,bl);
    r.addSlaves(tr,br);

    PANELS.insertAll(tl,tr,bl,br,t,b,l,r);

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

    PANELS.loadConfigs();
}
document.addEventListener("DOMContentLoaded", function()
        {
            panelTransformReady();
        });
