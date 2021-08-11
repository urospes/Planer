import { Obaveza } from "./obaveza.js";

export class Dan {

    constructor(datum){
        this.kontejner = null;
        this.obaveze = [];
        this.datum = new Date(datum);
    }

    dodajObavezu(obaveza){
        this.obaveze.push(obaveza);
    }

    crtajDan(host){
        if(!host)
            throw new Error("Greska!");

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("danKontejner");

        const podKontejnerDan = document.createElement("div");
        podKontejnerDan.className = "danTekstKontejner";
        const tekst = document.createElement("h2");
        tekst.innerHTML = this.datum.toLocaleDateString();
        tekst.className = "datum";
        podKontejnerDan.appendChild(tekst);
        this.kontejner.appendChild(podKontejnerDan);

        const podKontejnerObaveze = document.createElement("div");
        podKontejnerObaveze.className = "obavezeKontejner";
        this.obaveze.forEach(ob=>{
            ob.crtajObavezu(podKontejnerObaveze);
        });
        this.kontejner.appendChild(podKontejnerObaveze);

        host.appendChild(this.kontejner);
    }
}