using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlanerWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PlanerWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlanerController : ControllerBase
    {
        public PlanerContext Context {get; set;}
        public PlanerController(PlanerContext context)
        {
            Context = context;
        }


        [HttpPost]
        [Route("DodajPlaner")]
        public async Task DodajPlaner([FromBody] Planer planer)
        {
            Context.Planeri.Add(planer);
            await Context.SaveChangesAsync();
        }

        [HttpGet]
        [Route("PreuzmiPlanere")]
        //planer sa mesecima i danima
        public async Task<List<Planer>> PreuzmiPlanere()
        {
            return await Context.Planeri.Include(pl => pl.Meseci).ThenInclude(m => m.Dani).ToListAsync();
        }

        [HttpGet]
        [Route("PreuzmiDan/{idDana}")]
        public async Task<Dan> PreuzmiDan(int idDana)
        {
            return await Context.Dani.Where(dan => dan.Id == idDana).Include(dan => dan.Obaveze).FirstOrDefaultAsync();
        }

        [HttpGet]
        [Route("PreuzmiObaveze/{idDana}")]
        public async Task<List<Obaveza>> PreuzmiObaveze(int idDana)
        {
            return await Context.Obaveze.Where(ob => ob.Dan.Id == idDana).ToListAsync();
        }

        [HttpPost]
        [Route("DodajObavezu/{idDana}/{idPlanera}")]
        public async Task<List<int>> DodajObavezu([FromBody] Obaveza obaveza, int idDana, int idPlanera)
        {
            List<int> retVal = new List<int>();

            var dan = await Context.Dani.Where(d => d.Mesec.Planer.Id == idPlanera && d.Id == idDana).FirstOrDefaultAsync();
            if(dan == null)
            {
                var mesecIndex = obaveza.VremeOd.Month - 1;
                string[] meseci = new string[]{"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"};
                string mesecNaziv = meseci[mesecIndex];

                var mesec = await Context.Meseci.Where(m => m.Naziv == mesecNaziv && m.Planer.Id == idPlanera).FirstOrDefaultAsync();
                if(mesec == null)
                {
                    Mesec noviMesec = new Mesec();
                    noviMesec.Naziv = mesecNaziv;
                    var pl = await Context.Planeri.FindAsync(idPlanera);
                    noviMesec.Planer = pl;
                    Context.Meseci.Add(noviMesec);
                    await Context.SaveChangesAsync();
                    mesec = noviMesec;
                }

                Dan noviDan = new Dan();
                noviDan.Datum = obaveza.VremeOd;
                noviDan.Mesec = mesec;
                obaveza.Dan = noviDan;

                Context.Dani.Add(noviDan);
                await Context.SaveChangesAsync();
                retVal.Add(noviDan.Id);
            }
            else
            {
                obaveza.Dan = dan;
            }

            var obavezeTogDana = await Context.Obaveze.Where(obaveza => obaveza.Dan.Id == idDana).ToListAsync();
            
            //proveravamo uneto vreme
            bool validnoVreme = true;
            foreach(var obavezaTogDana in obavezeTogDana)
            {
                if((obaveza.VremeOd > obaveza.VremeDo) || 
                (obaveza.VremeOd >= obavezaTogDana.VremeOd && obaveza.VremeOd <= obavezaTogDana.VremeDo) ||
                (obaveza.VremeDo >= obavezaTogDana.VremeOd && obaveza.VremeDo <= obavezaTogDana.VremeDo) ||
                (obaveza.VremeOd <= obavezaTogDana.VremeOd && obaveza.VremeDo >= obavezaTogDana.VremeDo))
                {
                    validnoVreme = false;
                    break;
                }
            }

            if(!validnoVreme)
            {
                retVal.Clear();
                retVal.Add(-1);
                return retVal;
            }

            Context.Obaveze.Add(obaveza);
            await Context.SaveChangesAsync();
            retVal.Insert(0, obaveza.Id);
            return retVal;
        }


        [HttpPut]
        [Route("IzmeniObavezu/{idDana}")]
        public async Task<IActionResult> IzmeniObavezu([FromBody] Obaveza obaveza, int idDana)
        {
            var staraObaveza = await Context.Obaveze.FindAsync(obaveza.Id);

            if(staraObaveza == null)
                return StatusCode(402);

            var obavezeTogDana = await Context.Obaveze.Where(o => o.Dan.Id == idDana).ToListAsync();

            bool validnoVreme = true;
            foreach(var obavezaTogDana in obavezeTogDana)
            {
                if(obavezaTogDana.Id == obaveza.Id)
                    break;

                if((obaveza.VremeOd > obaveza.VremeDo) || 
                    (obaveza.VremeOd >= obavezaTogDana.VremeOd && obaveza.VremeOd <= obavezaTogDana.VremeDo) ||
                    (obaveza.VremeDo >= obavezaTogDana.VremeOd && obaveza.VremeDo <= obavezaTogDana.VremeDo) ||
                    (obaveza.VremeOd <= obavezaTogDana.VremeOd && obaveza.VremeDo >= obavezaTogDana.VremeDo))
                    {
                        validnoVreme = false;
                        break;
                    }
            }

            if(!validnoVreme)
                return StatusCode(401);

            staraObaveza.VremeOd = obaveza.VremeOd;
            staraObaveza.VremeDo = obaveza.VremeDo;
            staraObaveza.Bitna = obaveza.Bitna;

            Context.Update<Obaveza>(staraObaveza);
            await Context.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete]
        [Route("ObrisiObavezu/{idObaveze}")]
        public async Task<IActionResult> ObrisiObavezu(int idObaveze)
        {
            var obaveza = await Context.Obaveze.Where(o => o.Id == idObaveze)
                                                .Include(o => o.Dan)
                                                .ThenInclude(d => d.Mesec).FirstOrDefaultAsync();
            if(obaveza == null)
                return BadRequest("Ne postoji obaveza sa ovim ID-em!");

            Context.Obaveze.Remove(obaveza);

            var obavezeIstogDana = await Context.Obaveze.Where(o => o.Dan.Id == obaveza.Dan.Id).ToListAsync();
            if(obavezeIstogDana.Count == 1)
            {
                //brisemo i taj dan, ali prvo proverevamo da li mesec u kome je taj dan ima jos neki dan
                Context.Dani.Remove(obaveza.Dan);

                var daniUTomMesecu = await Context.Dani.Where(d => d.Mesec.Id == obaveza.Dan.Mesec.Id).ToListAsync();
                if(daniUTomMesecu.Count == 1)
                {
                    Context.Meseci.Remove(obaveza.Dan.Mesec);
                }
            }

            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
