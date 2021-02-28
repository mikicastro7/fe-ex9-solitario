class Personajes {
  nombre;
  familia;
  edad;
  estado = "vivo";
  serie = "Juego de Tronos";

  constructor(nombreP, familiaP, edadP) {
    this.nombre = nombreP;
    this.edad = edadP;
    this.familia = familiaP;
  };

  comunicar() {
    return "Comunicando";
  }
  morir() {
    this.estado = "muerto";
  }

}

class Rey extends Personajes {
  anyosReinado;

  constructor(anyosReinadoP, nombreP, familiaP, edadP) {
    super()
    this.anyosReinado = anyosReinadoP;
    this.nombre = nombreP;
    this.edad = edadP;
    this.familia = familiaP;
  }
  comunicar() {
    return "Vais a morir todos";
  }
}

class Luchador extends Personajes {
  arma;

  #destreza;
  constructor(armaP, nombreP, familiaP, edadP, destrezaP){
    super()
    this.arma = armaP;
    this.nombre = nombreP;
    this.edad = edadP;
    this.familia = familiaP;
    this.#destreza = this.controlarDestreza(destrezaP);
  }

  set destreza(destreza){
    this.#destreza = this.controlarDestreza(destreza)
  }

  get destreza(){
    return this.#destreza;
  }

  controlarDestreza(destreza) {
    let resDestreza = 0;
    if(destreza > 10){
      resDestreza = 10;
    } else if (destreza < 0) {
      resDestreza = 0
    } else {
      resDestreza = destreza;
    }
    return resDestreza;
  }

  comunicar() {
    return "Primero pego y luego pregunto";
  }
}

class Asesor extends Personajes {
  personajeAsesora;

  constructor(personajeAsesoraP, nombreP, familiaP, edadP) {
    super()
    this.personajeAsesora = personajeAsesoraP;
    this.nombre = nombreP;
    this.edad = edadP;
    this.familia = familiaP;
  }

  comunicar(){
    return "No sé por qué, pero creo que voy a morir pronto";

  }
}

class Escudero extends Personajes {
  personajeSirve;
  #gradoPelotismo;

  constructor(personajeSirveP, gradoPelotismoP, nombreP, familiaP, edadP) {
    super()
    this.personajeSirve = personajeSirveP;
    this.#gradoPelotismo = this.controlarPelotismo(gradoPelotismoP);
    this.nombre = nombreP;
    this.edad = edadP;
    this.familia = familiaP;
  }


  comunicar(){
    return "Soy un loser";
  }

  set gradoPelotismo(pelotsimo){
   this.#gradoPelotismo = this.controlarPelotismo(pelotsimo);
  }

  get gradoPelotismo(){
    return this.#gradoPelotismo;
  }

  controlarPelotismo(pelotismo) {
    let resPelotsimo = 0;
     if(pelotismo > 10){
      resPelotsimo = 10;
    } else if (pelotismo < 0) {
      resPelotsimo = 0;
    } else {
      resPelotsimo = pelotismo;
    }
    return resPelotsimo;
  }

}

let jofrey = new Rey(3, "Joffrey Baratheon", "Baratheon", 20);
let jamie = new Luchador("Bazoca", "Jaime Lannister", "Lanister", 20, 5);
let bronn = new Escudero(jamie, 9, "bronn", "sin familia", 60);
let daenerys = new Luchador("dragones", "Daenerys Targaryen", "Targaryen", 28, 10);
let tyrion = new Asesor(daenerys, "Tyrion Lannister", "Lannister", 36)

const personajes = [jofrey, jamie, bronn, daenerys, tyrion];
