import { Dan } from "./dan.js";
import { Obaveza } from "./obaveza.js";

export class Planer{

    constructor(vlasnik){
        this.kontejner = null;
        this.vlasnik = vlasnik;
        this.meseci = [{mesec: "Januar", dani: []}, {mesec: "Februar", dani: []}, {mesec: "Mart", dani: []}, 
        {mesec: "April", dani: []}, {mesec: "Maj", dani: []}, {mesec: "Jun", dani: []}, {mesec: "Jul", dani: []}, {mesec: "Avgust", dani: []}, 
        {mesec: "Septembar", dani: []}, {mesec: "Oktobar", dani: []}, {mesec: "Novembar", dani: []}, {mesec: "Decembar", dani: []}];

        //inicijalno su svi meseci neiscrtani
        this.meseci.forEach(mesec => {
            mesec.iscrtan = false;
        })
    }

    dodajDan(dan){
        const mesec = dan.datum.getMonth();
        this.meseci[mesec].dani.push(dan);
        dan.planer = this;
    }

    obrisiDan(dan){
        const mesec = dan.datum.getMonth();
        this.meseci[mesec].dani = this.meseci[mesec].dani.filter(danZaBrisanje => {
            return dan !== danZaBrisanje;
        });
    }

    crtajFormu(host){

        if(!host){
            throw new Error("Greska!");
        }

        const elementiForme = ["input", "textarea", "select", "input", "input", "input"];
        const elementiFormeKlase = ["nazivInput", "opisInput", "tipSelect", "datumInput", "vremeOdInput", "vremeDoInput"];
        const labele = ["Unesite naziv obaveze", "Detaljniji opis", "Tip obaveze", "Datum", "Vreme pocetka", "Vreme kraja"];
        elementiForme.forEach((tipPolja, index) => {

                const labela = document.createElement("label");
                labela.innerHTML = labele[index];
                host.appendChild(labela);
                const inputElement = document.createElement(tipPolja);
                if(tipPolja === "input" && index != 3){
                    inputElement.type = "text";
                } else if(index === 3){
                    inputElement.type = "date";
                } else if(tipPolja === "select"){
                    const opcije = ["-", "Fakultet", "Hobi", "Ostalo"];
                opcije.forEach(opcija=>{
                    const tip = document.createElement("option");
                    tip.innerHTML = opcija;
                    tip.value = opcija;
                    inputElement.appendChild(tip);
                })
            }
            inputElement.className = elementiFormeKlase[index];
            host.appendChild(inputElement);
        })

        //posebno iscrtavamo checkbox da bi bio u istoj liniji
        const checkboxDiv = document.createElement("div");
        const labela = document.createElement("label");
        labela.innerHTML = "Bitno?";
        checkboxDiv.className = "chkBitnoLinija";
        checkboxDiv.appendChild(labela);
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "chkBitno"
        checkboxDiv.appendChild(checkBox);
        host.appendChild(checkboxDiv); 

        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj obavezu";
        dugme.className = "dugmeDodaj";
        dugme.classList.add("dugme");
        dugme.classList.add("dugmePrimary");
        dugme.onclick = (event) => {
            this.onDodajObavezu(event);
        }
        host.appendChild(dugme);

        const placeholderKlase = [".vremeOdInput", ".vremeDoInput"];
        placeholderKlase.forEach(klasa => {
            let element = this.kontejner.querySelector(klasa);
            element.placeholder = "u formatu HH:mm";
        })
    }

    crtajPlaner(host){

        if(!host){
            throw new Error("Greska!");
        }

        const naslov = document.createElement("h1");
        naslov.className = "naslov";
        naslov.innerHTML = "Godisnji planer - vlasnik : " + this.vlasnik;
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
            podKontejner.classList.add("kontejnerMesec");
            podKontejner.id = mesec.mesec + "Div";
            podKontejner.innerHTML = mesec.mesec;
            const divDugme = document.createElement("div");
            divDugme.className = "dugmeDiv";
            podKontejner.appendChild(divDugme);
            const dugmePrikaz = document.createElement("button");
            dugmePrikaz.innerHTML = "Prikazi obaveze";
            dugmePrikaz.className = "dugme";
            dugmePrikaz.classList.add("zelenoDugme");
            dugmePrikaz.id = mesec.mesec;
            dugmePrikaz.onclick=(event) => {
                this.prikaziMesec(event.target.id, dugmePrikaz, podKontejner);
            }
            divDugme.appendChild(dugmePrikaz);
            podKonejnerPlaner.appendChild(podKontejner);
        })
        host.appendChild(this.kontejner);
    }

    prikaziMesec(mesec, dugme, host){
        const kliknutiMesec = this.meseci.find(element => {
            return element.mesec === mesec;
        })
        if(!kliknutiMesec){
            throw new Error("Ne postoji taj mesec!");
        }
        if(!kliknutiMesec.iscrtan && kliknutiMesec.dani.length === 0){
            alert("Nemate obaveze ovog meseca!");
        } else {
            if(!kliknutiMesec.iscrtan){
                kliknutiMesec.iscrtan = true;
                dugme.innerHTML = "Sakrij obaveze"
                dugme.classList.remove("zelenoDugme");
                dugme.classList.add("crvenoDugme");
                host.scrollIntoView(true);
                kliknutiMesec.dani.forEach(dan => {
                    dan.crtajDan(host);
                })
            } else {
                kliknutiMesec.iscrtan = false;
                dugme.innerHTML = "Prikazi obaveze";
                dugme.classList.remove("crvenoDugme");
                dugme.classList.add("zelenoDugme");
                const deca = host.querySelectorAll(".danKontejner");
                deca.forEach(dete => {
                    dete.remove();
                })
            }
        }
    }


    onDodajObavezu(event){
        
        //pribavljamo vrednosti input polja

        const inputPolja = [];
        const inputKlase = [".nazivInput", ".opisInput", ".tipSelect", ".datumInput", ".vremeOdInput", ".vremeDoInput"];

        inputKlase.forEach(inputElement => {
            inputPolja.push(this.kontejner.querySelector(inputElement).value);
        })
        inputPolja.push(this.kontejner.querySelector(".chkBitno").checked);

        // validacija unosa

        //nevalidan unos
        if(inputPolja[0] === "" || inputPolja[2] === "-" || inputPolja[3] === "" || inputPolja[4] === "" || inputPolja[5] === ""){
            alert("Molimo vas da unesete sve neophodne informacije. Potrebno je uneti vreme pocetka i kraja, kao i naziv i tip obaveze!");
        } else if(!this.testirajUnetoVreme(inputPolja[4], inputPolja[5])) {
            alert("Molimo vas da unesete validno vreme pocetka i vreme kraja. Proverite da li ste ispostovali format!");
        } else {
        //validan unos
            const mesecIndex = new Date(inputPolja[3]).getMonth();
            const datumPocetka = inputPolja[3] + "T" + inputPolja[4] + ":00";
            const datumKraja = inputPolja[3] + "T" + inputPolja[5] + ":00";
            const obaveza = new Obaveza(inputPolja[0], inputPolja[2], inputPolja[1], inputPolja[6], datumPocetka, datumKraja);
            const dan = new Dan(datumPocetka);

            const danUKalendaru = this.meseci[mesecIndex].dani.find(postojeciDan => {
                return dan.datum.getDay() === postojeciDan.datum.getDay()
            });

            const mesec = this.meseci[mesecIndex].mesec;
            if(!danUKalendaru){
                dan.dodajObavezu(obaveza);
                dan.planer = this;
                this.meseci[mesecIndex].dani.push(dan);

                //ukoliko mesec nije iscrtan crtamo mesec, ako je iscrtan crtamo samo dan
                if(!this.meseci[mesecIndex].iscrtan){
                    this.prikaziMesec(mesec, this.kontejner.querySelector("#" + mesec), this.kontejner.querySelector("#" + mesec + "Div"));
                } else {
                    dan.crtajDan(this.kontejner.querySelector("#" + mesec + "Div"));
                }
            } else {
                //proveravamo da li postoji druga obaveza u to vreme
                if(!this.postojiObaveza(new Date(datumPocetka).toLocaleTimeString(), new Date(datumKraja).toLocaleTimeString(), danUKalendaru)){
                    obaveza.dan = danUKalendaru;
                    danUKalendaru.obaveze.push(obaveza);
                    //crtamo mesec ako nije iscrtan, ako jeste crtamo novu obavezu za odgovarajuci dan
                    if(!this.meseci[mesecIndex].iscrtan){
                        this.prikaziMesec(mesec, this.kontejner.querySelector("#" + mesec), this.kontejner.querySelector("#" + mesec + "Div"));
                    } else {
                        const danKontejner = danUKalendaru.kontejner.querySelector(".obavezeKontejner");
                        obaveza.crtajObavezu(danKontejner);
                    }
                } else {
                    alert("Vec imate zakazanu obavezu u to vreme!");
                    return;
                }
            }
            alert("Uspesno ste dodali novu obavezu!");
        }
    }

    testirajUnetoVreme(vremeOd, vremeDo){
        const regExp = new RegExp("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
        return vremeOd < vremeDo && regExp.test(vremeOd) && regExp.test(vremeDo);
    }

    postojiObaveza(vremePocetka, vremeKraja, dan){
        let nevalidno = false;
        dan.obaveze.forEach(obaveza => {
            if((vremePocetka >= obaveza.vremeOd && vremePocetka <= obaveza.vremeDo ) || 
                (vremeKraja >= obaveza.vremeOd && vremeKraja <= obaveza.vremeDo) || 
                (vremePocetka < obaveza.vremeOd && vremeKraja > obaveza.vremeDo)){
                    nevalidno = true;
                }
        })
        return nevalidno;
    }


    ispuniFormu(naziv, opis, tip, datum, vremeOd, vremeDo, bitna){
        const parametri = [...arguments];
        const klase = [".nazivInput", ".opisInput", ".tipSelect", ".datumInput", ".vremeOdInput", ".vremeDoInput"];
        klase.forEach((klasa,index) => {
            const element = this.kontejner.querySelector(klasa);
            if(index < 4){
                element.disabled = true;
            }
            element.value = parametri[index];
        })
        const chkBox = this.kontejner.querySelector(".chkBitno");
        chkBox.checked = bitna;

        //crtamo dugmice za izmenu
        const dugmeDodaj = this.kontejner.querySelector(".dugmeDodaj");
        if(dugmeDodaj) {
            const roditelj = dugmeDodaj.parentNode;
            roditelj.removeChild(dugmeDodaj);
            crtajDugmiceZaIzmenu(roditelj);
        }

        function crtajDugmiceZaIzmenu(host){
            const dugmiciRed = document.createElement("div");
            dugmiciRed.className = "izmenaDugmiciRed";
            host.appendChild(dugmiciRed);
            const dugmici = ["Izmeni", "Odustani"];
            dugmici.forEach(dugmeTekst => {
                let dugme = document.createElement("button");
                dugme.innerHTML = dugmeTekst;
                dugme.classList.add("dugme");
                dugme.classList.add("dugmeIzmena");
                dugme.classList.add("dugmePrimary");
                dugmiciRed.appendChild(dugme);
            })
        }

        const dugmici = [...this.kontejner.querySelectorAll(".dugmeIzmena")];
        dugmici.forEach(dugme => {
            dugme.onclick = (event)=>{
                if(event.target.innerHTML === "Odustani"){
                    return this.onOdustani();
                } else {
                    return this.onIzmena();
                }
            }
        })
    }

    onIzmena(){
        if(!this.obavezaZaIzmenu){
            throw new Error("Nije izabrana obaveza za izmenu!");
        }

        const datum = this.kontejner.querySelector(".datumInput").value;
        const novoVremePocetka = this.kontejner.querySelector(".vremeOdInput").value;
        const novoVremeKraja = this.kontejner.querySelector(".vremeDoInput").value;
        const bitna =  this.kontejner.querySelector(".chkBitno").checked;

        if(!this.testirajUnetoVreme(novoVremePocetka, novoVremeKraja)){
            alert("Molimo vas da unesete validno vreme pocetka i vreme kraja. Proverite da li ste ispostovali format!");
        } else {
            const obavezaRoditelj = this.obavezaZaIzmenu.kontejner.parentNode;
            obavezaRoditelj.removeChild(this.obavezaZaIzmenu.kontejner);

            const novoVremeOd = new Date(datum + "T" + novoVremePocetka + ":00").toLocaleTimeString();
            const novoVremeDo = new Date(datum + "T" + novoVremeKraja + ":00").toLocaleTimeString();
            this.obavezaZaIzmenu.vremeOd = novoVremeOd;
            this.obavezaZaIzmenu.vremeDo = novoVremeDo;
            this.obavezaZaIzmenu.bitna = bitna;

            this.obavezaZaIzmenu.crtajObavezu(obavezaRoditelj);
            alert("Izmena uspesno obavljena!");
        }
    }

    onOdustani(){
        const dugmiciIzmenaRed = this.kontejner.querySelector(".izmenaDugmiciRed");
        const roditelj = dugmiciIzmenaRed.parentNode;
        dugmiciIzmenaRed.remove();
        const dugmeDodaj = document.createElement("button");
        dugmeDodaj.innerHTML = "Dodaj obavezu";
        dugmeDodaj.classList.add("dugme");
        dugmeDodaj.classList.add("dugmeDodaj");
        dugmeDodaj.classList.add("dugmePrimary");
        dugmeDodaj.onclick = (event)=>{
            console.log(this);
            this.onDodajObavezu(event);
        }
        roditelj.appendChild(dugmeDodaj);

        ocistiFormu(this.kontejner);

        function ocistiFormu(kontejner){
            const klase = [".nazivInput", ".opisInput", ".tipSelect", ".datumInput", ".vremeOdInput", ".vremeDoInput"];
            klase.forEach((klasa, index) => {
                const element = kontejner.querySelector(klasa);
                if(index < 4){
                    element.disabled = false;
                }
                element.value = "";
            })
            const chkBox = kontejner.querySelector(".chkBitno");
            chkBox.checked = false;
        }
    }
}