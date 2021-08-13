export class Planer{

    constructor(vlasnik){
        this.kontejner = null;
        this.vlasnik = vlasnik;
        this.meseci = [{mesec: "januar", dani: []}, {mesec: "februar", dani: []}, {mesec: "mart", dani: []}, {mesec: "april", dani: []},
        {mesec: "maj", dani: []}, {mesec: "jun", dani: []}, {mesec: "jul", dani: []}, {mesec: "avgust", dani: []}, {mesec: "septembar", dani: []},
        {mesec: "oktobar", dani: []}, {mesec: "novembar", dani: []}, {mesec: "decembar", dani: []}];
    }

    dodajDan(dan){
        const mesec = dan.datum.getMonth();
        this.meseci[mesec].dani.push(dan);
    }

    crtajFormu(host){

        if(!host){
            throw new Error("Greska!");
        }

        const elementiForme = ["input", "textarea", "select", "checkbox", "input", "input"];
        const elementiFormeKlase = ["nazivInput", "opisInput", "tipSelect", "chkBitno", "vremeOdInput", "vremeDoInput"];
        const labele = ["Unesite naziv obaveze", "Detaljniji opis", "Tip obaveze", "Bitno?", "Vreme pocetka", "Vreme kraja"];
        elementiForme.forEach((tipPolja, index) => {
            const labela = document.createElement("label");
            labela.innerHTML = labele[index];
            host.appendChild(labela);
            const inputElement = document.createElement(tipPolja);
            if(tipPolja === "input"){
                inputElement.type = "text";
            } else if (tipPolja === "select"){

                const opcije = ["-", "Fakultet", "Hobi", "Ostalo"];
                opcije.forEach(opcija=>{
                    const tip = document.createElement("option");
                    tip.innerHTML = opcija;
                    inputElement.appendChild(tip);
                })

            }

            inputElement.className = elementiFormeKlase[index];
            host.appendChild(inputElement);
        })
        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj obavezu";
        dugme.className = "dugmeDodaj";
        host.appendChild(dugme);
    }

    crtajPlaner(host){

        if(!host){
            throw new Error("Greska!");
        }

        const naslov = document.createElement("h1");
        naslov.className = "naslov";
        naslov.innerHTML = "Godisnji planer";
        host.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.className = "planer";

        //***************** kontejner za formu ********
        
        const podKontejnerForma = document.createElement("div");
        podKontejnerForma.className = "kontejnerForme";
        this.kontejner.appendChild(podKontejnerForma);

        this.crtajFormu(podKontejnerForma);

        //*****************************************

        const podKonejnerPlaner = document.createElement("div");
        podKonejnerPlaner.className = "kontejnerPlaner";
        this.kontejner.appendChild(podKonejnerPlaner);

        this.meseci.forEach(mesec => {
            const podKontejner = document.createElement("div");
            podKontejner.className = "podKontejnerMesec";
            mesec.dani.forEach(dan => {
                dan.crtajDan(podKontejner);
            })
            podKonejnerPlaner.appendChild(podKontejner);
        })
        host.appendChild(this.kontejner);
    }
}