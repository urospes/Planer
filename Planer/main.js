import { Dan } from "./dan.js";
import { Obaveza } from "./obaveza.js";
import { Planer } from "./planer.js";

const planer = new Planer("Uros Pesic");
const datum = "2021-11-11T13:34:23";
const dan = new Dan("2021-11-23");
const dan2 = new Dan("2020-1-3");
const dan3 = new Dan("2021-11-3");
const obaveza = new Obaveza("Test", "Fakultet", "Ovo je neka obaveza", false, datum, datum);
const obaveza2 = new Obaveza("Test", "Ostalo", "Ovo je neka obaveza", true, datum, datum);
const obaveza3 = new Obaveza("Test", "Hobi", "Ovo je neka obaveza", false, datum, datum);
const obaveza4 = new Obaveza("Nova1", "Hobi", "Ovo je neka obaveza", true, datum, datum);
const obaveza5 = new Obaveza("Nova2", "Hobi", "Ovo je neka obaveza", false, datum, datum);
const obaveza6 = new Obaveza("Nova3", "Hobi", "Ovo je neka obaveza", false, datum, datum);
const obaveza7 = new Obaveza("Nova4", "Hobi", "Ovo je neka obaveza", false, datum, datum);
const obaveza8 = new Obaveza("Nova5", "Hobi", "Ovo je neka obaveza", true, datum, datum);
dan.dodajObavezu(obaveza);
dan.dodajObavezu(obaveza2);
dan.dodajObavezu(obaveza3);
dan.dodajObavezu(obaveza4);
dan.dodajObavezu(obaveza5);
dan2.dodajObavezu(obaveza6);
dan2.dodajObavezu(obaveza7);
dan3.dodajObavezu(obaveza8);
planer.dodajDan(dan);
planer.dodajDan(dan2);
planer.dodajDan(dan3);

planer.crtajPlaner(document.body);



const planer2 = new Planer("Miljana Simic");
const datum2 = "2021-03-06T15:17:11";
const dan12 = new Dan("2021-7-23");
const dan22 = new Dan("2020-6-20");
const dan32 = new Dan("2021-9-22");
const obaveza12 = new Obaveza("Mimi", "Fakultet", "Ovo je neka obaveza", false, datum2, datum2);
const obaveza22 = new Obaveza("Mimi2", "Ostalo", "Ovo je neka obaveza", true, datum2, datum2);
const obaveza32 = new Obaveza("Mimi3", "Hobi", "Ovo je neka obaveza", false, datum2, datum2);
const obaveza42 = new Obaveza("Mimi4", "Hobi", "Ovo je neka obaveza", true, datum2, datum2);
const obaveza52 = new Obaveza("Mimi5", "Ostalo", "Ovo je neka obaveza", false, datum2, datum2);
const obaveza62 = new Obaveza("Mimi6", "Fakultet", "Ovo je neka obaveza", false, datum2, datum2);
const obaveza72 = new Obaveza("Mimi7", "Hobi", "Ovo je neka obaveza", false, datum2, datum2);
const obaveza82 = new Obaveza("Mimi8", "Hobi", "Ovo je neka obaveza", true, datum2, datum2);
dan12.dodajObavezu(obaveza12);
dan12.dodajObavezu(obaveza22);
dan12.dodajObavezu(obaveza32);
dan12.dodajObavezu(obaveza42);
dan12.dodajObavezu(obaveza52);
dan22.dodajObavezu(obaveza62);
dan22.dodajObavezu(obaveza72);
dan32.dodajObavezu(obaveza82);
planer2.dodajDan(dan12);
planer2.dodajDan(dan22);
planer2.dodajDan(dan32);

planer2.crtajPlaner(document.body);