import { Dan } from "./dan.js";
import { Obaveza } from "./obaveza.js";

export class Mesec{
    constructor(mesec, dani){
        this.mesec = mesec;
        this.dani = [];
        dani.forEach(dan => {
            dan.mesec = this;
            this.dani.push(new Dan(dan.id, dan.datum));
        });
    }

    crtajMesec(host){
        if(!host){
            throw new Error("Greska!");
        }

        const podKontejner = document.createElement("div");
        podKontejner.classList.add("kontejnerMesec");
        podKontejner.id = this.mesec + "Div";
        podKontejner.innerHTML = this.mesec;
        const divDugme = document.createElement("div");
        divDugme.className = "dugmeDiv";
        podKontejner.appendChild(divDugme);
        const dugmePrikaz = document.createElement("button");
        dugmePrikaz.innerHTML = "Prikazi obaveze";
        dugmePrikaz.className = "dugme";
        dugmePrikaz.classList.add("zelenoDugme");
        dugmePrikaz.id = this.mesec;
        dugmePrikaz.onclick=(event) => {
            this.prikaziMesec(this.planer, dugmePrikaz, podKontejner);
        }
        divDugme.appendChild(dugmePrikaz);
        host.appendChild(podKontejner);
    }

    prikaziMesec(planer, dugme, host){

        const kliknutiMesec = this;

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
                    fetch("https://localhost:5001/Planer/PreuzmiObaveze/" + dan.id.toString()).then(response =>{
                        response.json().then(responseData => {
                            const obaveze = [];
                            responseData.forEach(obaveza => {
                                let ob = new Obaveza(obaveza.id, obaveza.naziv, obaveza.tip, obaveza.opis,
                                obaveza.bitna, obaveza.vremeOd, obaveza.vremeDo);
                                ob.dan = dan;
                                obaveze.push(ob);
                            })
                            dan.obaveze = obaveze;
                            dan.planer = planer;
                            dan.crtajDan(host);
                          })
                    }).catch(error => alert(error));
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
}