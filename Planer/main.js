import { Dan } from "./dan.js";
import { Obaveza } from "./obaveza.js";
import { Planer } from "./planer.js";

const planer = new Planer("Uros Pesic");
const datum = new Date().toLocaleTimeString();
const dan = new Dan("2021-11-23");
const dan2 = new Dan("2020-1-3");
const dan3 = new Dan("2021-11-3");
const obaveza = new Obaveza("Test", "ostalo", "Ovo je neka obaveza", false, datum, datum);
const obaveza2 = new Obaveza("Test", "ostalo", "Ovo je neka obaveza", true, datum, datum);
dan.dodajObavezu(obaveza);
dan.dodajObavezu(obaveza2);
dan.dodajObavezu(obaveza);
dan.dodajObavezu(obaveza2);
dan.dodajObavezu(obaveza);
dan2.dodajObavezu(obaveza);
dan2.dodajObavezu(obaveza2);
dan3.dodajObavezu(obaveza);
planer.dodajDan(dan);
planer.dodajDan(dan2);
planer.dodajDan(dan3);

planer.crtajPlaner(document.body);