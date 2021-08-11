export class Obaveza {

    constructor(naziv, tip, opis, bitna, vremeOd, vremeDo){
        this.kontejner = null;
        this.naziv = naziv;
        this.tip = tip;
        this.opis = opis;
        this.bitna = bitna;
        this.vremeOd = vremeOd;
        this.vremeDo = vremeDo;
    }

    crtajObavezu(host){
        if(!host)
            throw new Error("Greska!");

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("obaveza");
        //vidi za boju pozadine
        this.kontejner.classList.add(this.vratiBoju());
        if(this.bitna){
            this.kontejner.classList.add("bitna");
        }

        this.kreirajElement(this.kontejner, "h3", this.naziv);
        this.kreirajElement(this.kontejner, "p", this.opis);
        this.kreirajElement(this.kontejner, "h4", this.tip);
        this.kreirajElement(this.kontejner, "h5", this.vremeOd);
        this.kreirajElement(this.kontejner, "h5", this.vremeDo);

        host.appendChild(this.kontejner);
    }

    kreirajElement(host, element, tekst){
        const el = document.createElement(element);
        el.innerHTML = tekst;
        host.appendChild(el);
    }

     vratiBoju(){
        if(this.tip === "fakultet")
            return "plava";

        if(this.tip === "hobi")
            return "zelena";
        
        if(this.tip === "ostalo")
            return "zuta";
    }

    
}