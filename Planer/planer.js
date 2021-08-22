import { Dan } from "./dan.js";
import { Obaveza } from "./obaveza.js";
import { Mesec } from "./mesec.js";

export class Planer{

    constructor(id, vlasnik, meseci){
        this.id = id;
        this.kontejner = null;
        this.vlasnik = vlasnik;
        const listaMeseci = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
        this.meseci = [];
        listaMeseci.forEach(mesecNaziv => {
            const mesecIzBaze = meseci.find(ucitaniMesec => {
                return ucitaniMesec.naziv === mesecNaziv;
            });
            if(mesecIzBaze){
                const m = new Mesec(mesecIzBaze.naziv, mesecIzBaze.dani);
                m.planer = this;
                this.meseci.push(m);
            } else {
                const m = new Mesec(mesecNaziv, []);
                m.planer = this;
                this.meseci.push(m);
            }
        })

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
            mesec.crtajMesec(podKonejnerPlaner);
        })
        host.appendChild(this.kontejner);
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
            const obavezaTemplate = new Obaveza(-1 , inputPolja[0], inputPolja[2], inputPolja[1], inputPolja[6], datumPocetka, datumKraja);

            const danUKalendaru = this.meseci[mesecIndex].dani.find(postojeciDan => {
                return new Date(datumPocetka).getDate() === postojeciDan.datum.getDate();
            });

            const mesec = this.meseci[mesecIndex].mesec;
            if(!danUKalendaru){
                    fetch("https://localhost:5001/Planer/DodajObavezu/" + "-1/"+ this.id, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            naziv: obavezaTemplate.naziv,
                            opis: obavezaTemplate.opis,
                            tip: obavezaTemplate.tip,
                            bitna: obavezaTemplate.bitna,
                            vremeOd: datumPocetka,
                            vremeDo: datumKraja
                        })
                    }).then(response => {
                        if(response.status == 200){
                            response.json().then(ids => {
                                const dan = new Dan(ids[1], datumPocetka);
                                const obaveza = new Obaveza(ids[0], inputPolja[0], inputPolja[2], inputPolja[1], inputPolja[6], datumPocetka, datumKraja);
                                dan.dodajObavezu(obaveza);
                                dan.planer = this;
                                this.meseci[mesecIndex].dani.push(dan);

                                if(!this.meseci[mesecIndex].iscrtan){
                                    this.meseci[mesecIndex].prikaziMesec(this, this.kontejner.querySelector("." + mesec), this.kontejner.querySelector("." + mesec + "Div"));
                                } else {
                                    dan.crtajDan(this.kontejner.querySelector("." + mesec + "Div"));
                                }
                            })
                        }
                    }).catch(error => {
                        alert(error);
                    });
            } else {
                //proveravamo da li postoji druga obaveza u to vreme
                if(!this.postojiObaveza(new Date(datumPocetka).toLocaleTimeString(), new Date(datumKraja).toLocaleTimeString(), danUKalendaru)){
                    fetch("https://localhost:5001/Planer/DodajObavezu/" + danUKalendaru.id.toString() + "/" + this.id, 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            naziv: obavezaTemplate.naziv,
                            opis: obavezaTemplate.opis,
                            tip: obavezaTemplate.tip,
                            bitna: obavezaTemplate.bitna,
                            vremeOd: datumPocetka,
                            vremeDo: datumKraja
                        })
                    }).then(response => {
                        if(response.status == 200){
                            response.json().then(ids => {
                                const obaveza = new Obaveza(ids[0], inputPolja[0], inputPolja[2], inputPolja[1], inputPolja[6], datumPocetka, datumKraja);
                                obaveza.dan = danUKalendaru;
                                danUKalendaru.obaveze.push(obaveza);

                                if(!this.meseci[mesecIndex].iscrtan){
                                    this.meseci[mesecIndex].prikaziMesec(this, this.kontejner.querySelector("." + mesec), this.kontejner.querySelector("." + mesec + "Div"));
                                } else {
                                    const danKontejner = danUKalendaru.kontejner.querySelector(".obavezeKontejner");
                                    obaveza.crtajObavezu(danKontejner);
                                }
                            })
                        }
                    }).catch(error => {
                        alert(error);
                    });
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
                (vremePocetka <= obaveza.vremeOd && vremeKraja >= obaveza.vremeDo)){
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
            //const novoVremeOd = new Date(datum + "T" + novoVremePocetka + ":00").toLocaleTimeString();
            //const novoVremeDo = new Date(datum + "T" + novoVremeKraja + ":00").toLocaleTimeString();
            const novoVremeOd = datum + "T" + novoVremePocetka + ":00";
            const novoVremeDo = datum + "T" + novoVremeKraja + ":00";
            this.obavezaZaIzmenu.vremeOd = new Date(novoVremeOd).toLocaleTimeString();
            this.obavezaZaIzmenu.vremeDo = new Date(novoVremeDo).toLocaleTimeString();
            this.obavezaZaIzmenu.bitna = bitna;
            fetch("https://localhost:5001/Planer/IzmeniObavezu/" + this.obavezaZaIzmenu.dan.id.toString(),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.obavezaZaIzmenu.id,
                    naziv: this.obavezaZaIzmenu.naziv,
                    opis: this.obavezaZaIzmenu.opis,
                    tip: this.obavezaZaIzmenu.tip,
                    bitna: this.obavezaZaIzmenu.bitna,
                    vremeOd: novoVremeOd,
                    vremeDo: novoVremeDo
                })
            }).then(response => {
                if(response.status == 200){
                    const obavezaRoditelj = this.obavezaZaIzmenu.kontejner.parentNode;
                    obavezaRoditelj.removeChild(this.obavezaZaIzmenu.kontejner);
                    this.obavezaZaIzmenu.crtajObavezu(obavezaRoditelj);
                    alert("Izmena uspesno obavljena!");
                } else {
                    alert("Uneli ste nevalidno vreme. Proverite da li imate obavezu u to vreme!");
                }
            }).catch(error => {
                alert(error);
            })
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