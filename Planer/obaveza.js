export class Obaveza {

    constructor(naziv, tip, opis, bitna, vremeOd, vremeDo){
        this.kontejner = null;
        this.naziv = naziv;
        this.tip = tip;
        this.opis = opis;
        this.bitna = bitna;
        this.vremeOd = new Date(vremeOd).toLocaleTimeString();
        this.vremeDo = new Date(vremeDo).toLocaleTimeString();
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
        const dugmiciKontejner = this.kreirajElement(this.kontejner, "div", "");
        dugmiciKontejner.className = "dugmiciObaveza";

        let dugme = this.kreirajElement(dugmiciKontejner, "button", "Brisanje");
        dugme.classList.add("dugme");
        dugme.classList.add("dugmePrimary");
        dugme.onclick = (event => {
            this.obrisiObavezu();
        });

        dugme = this.kreirajElement(dugmiciKontejner, "button", "Izmena");
        dugme.classList.add("dugme");
        dugme.classList.add("dugmePrimary");
        dugme.onclick = (event => {
            this.izmeniObavezu(this);
        });

        host.appendChild(this.kontejner);
    }

    kreirajElement(host, element, tekst){
        const el = document.createElement(element);
        el.innerHTML = tekst;
        host.appendChild(el);
        return el;
    }

     vratiBoju(){
        if(this.tip === "Fakultet")
            return "plava";

        if(this.tip === "Hobi")
            return "zelena";
        
        if(this.tip === "Ostalo")
            return "zuta";
    }

    obrisiObavezu(){
        const obavezaZaBrisanjeIndex = this.dan.obaveze.findIndex(obaveza => {
            return this === obaveza;
        })
        if(obavezaZaBrisanjeIndex !== -1){
            //brisemo iz niza
            this.dan.obaveze.splice(obavezaZaBrisanjeIndex, 1);
            //brisemo i nacrtano
            let roditelj = this.kontejner.parentNode;
            roditelj.removeChild(this.kontejner);

            if(this.dan.obaveze.length === 0){
                this.dan.planer.obrisiDan(this.dan);
                //brisemo i nacrtani dan
                roditelj = this.dan.kontejner.parentNode;
                roditelj.removeChild(this.dan.kontejner);
            }
            alert("Brisanje uspesno");
        }
    }

    izmeniObavezu(obaveza) {

        function formatirajVreme(vremeLocaleString){
            const formatiranoVreme = vremeLocaleString.split(":");
            if(formatiranoVreme[2].includes("PM")){
                if(formatiranoVreme[0] === "12"){
                    return formatiranoVreme[0] + ":" + formatiranoVreme[1];
                } else {
                    return (+formatiranoVreme[0] + 12).toString() + ":" + formatiranoVreme[1];
                }
            } else {
                if(formatiranoVreme[0] === "12"){
                    return "00:" + formatiranoVreme[1];
                } else {
                    return "0"+ formatiranoVreme[0] + ":" + formatiranoVreme[1];
                }
            }
        }

        function formatirajDatum(datumLocaleString){
            const formatiraniDatum = datumLocaleString.split("/");
            if(+formatiraniDatum[0] < 10){
                formatiraniDatum[0] = "0" + formatiraniDatum[0];
            }
            if(+formatiraniDatum[1] < 10){
                formatiraniDatum[1] = "0" + formatiraniDatum[1];
            }
            let temp = formatiraniDatum[0];
            formatiraniDatum[0] = formatiraniDatum[1];
            formatiraniDatum[1] = temp;

            return formatiraniDatum.reverse().join("-");
        }

        const datum = formatirajDatum(this.dan.datum.toLocaleDateString());
        const vremeOd = formatirajVreme(this.vremeOd);
        const vremeDo = formatirajVreme(this.vremeDo);

        this.dan.planer.obavezaZaIzmenu = obaveza;
        this.dan.planer.ispuniFormu(this.naziv, this.opis, this.tip, datum, vremeOd, vremeDo, this.bitna);
    }
}