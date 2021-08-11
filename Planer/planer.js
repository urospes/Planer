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

    crtajPlaner(host){

        if(!host){
            throw new Error("Greska!");
        }

        this.kontejner = document.createElement("div");
        this.kontejner.className = "planer";

        //***************** forme i ostalo ********
        
        const podKontejnerForma = document.createElement("div");
        podKontejnerForma.className = "kontejnerForme";
        this.kontejner.appendChild(podKontejnerForma);
        //elementi forme
        //**********************************OVDEEEEEE ***********************************************
        const polje = document.createElement("input");
        polje.type = "text";
        podKontejnerForma.appendChild(polje);

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