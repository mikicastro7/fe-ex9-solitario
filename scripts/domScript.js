/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
const personajesDom = () => {
  const personajeDumy = document.querySelector(".personaje-dummy");
  // eslint-disable-next-line guard-for-in
  let i = 0;
  const cardsInterval = setInterval(() => {
    const personajeCloneDumy = personajeDumy.cloneNode(true);
    personajeDumy.before(datosNodoPersonajeDom(personajes[i], personajeCloneDumy, i, cardsInterval, personajeDumy));
    i++;
    if (i === personajes.length) clearInterval(cardsInterval);
  }, 1000);
};

const datosNodoPersonajeDom = (personaje, nodoPersonaje, i, cardsInterval, personajeDumy) => {
  nodoPersonaje.querySelector(".accion:last-child")
    .addEventListener("click", () => { matarPersonajeEvent(i, cardsInterval, personajeDumy); });
  nodoPersonaje.querySelector(".accion:first-child")
    .addEventListener("click", () => { hablarPersonaje(i); });
  nodoPersonaje.classList.remove("personaje-dummy");
  const imagenPersonaje = nodoPersonaje.querySelector("img");
  if (personaje.estado === "muerto") {
    imagenPersonaje.classList.add("personaje-muerto");
    nodoPersonaje.querySelector(".fa-thumbs-up").remove();
  } else {
    nodoPersonaje.querySelector(".fa-thumbs-down").remove();
  }
  imagenPersonaje.src = `../img/${personaje.nombre.toLowerCase().split(" ")[0]}.jpg`;
  imagenPersonaje.alt = `${personaje.nombre} de juego de tronos`;
  nodoPersonaje.querySelector(".nombre").textContent = personaje.nombre;

  // nodoPersonaje.querySelector(".emoji").textContent = getEmogi(personaje);
  setDatosTipoPersonaje(personaje, nodoPersonaje);
  return nodoPersonaje;
};

const setDatosTipoPersonaje = (personaje, nodoPersonaje) => {
  if (personaje instanceof Rey) {
    res = "👑";
  } else if (personaje instanceof Luchador) {
    res = "🗡";
  } else if (personaje instanceof Asesor) {
    res = "🎓";
  } else if (personaje instanceof Escudero) {
    res = "🛡";
  }

  return res;
};

personajesDom();

const matarPersonajeEvent = (i, cardsInterval, personajeDumy) => {
  if (personajes[i].estado === "vivo") {
    clearInterval(cardsInterval);
    limpiarListaPersonajesDom(personajeDumy);
    personajes[i].morir();
    personajesDom();
  }
};

const hablarPersonaje = (i) => {
  const comunicacionesNode = document.querySelector(".comunicaciones");
  comunicacionesNode.querySelector("p").textContent = personajes[i].comunicar();
  comunicacionesNode.querySelector("img").src = `../img/${personajes[i].nombre.toLowerCase().split(" ")[0]}.jpg`;
  comunicacionesNode.querySelector("img").alt = `${personajes[i].nombre} de juego de tronos`;
  comunicacionesNode.classList.add("on");
  setTimeout(() => {
    comunicacionesNode.classList.remove("on");
  }, 2000);
};

const limpiarListaPersonajesDom = (personajeDumy) => {
  const personajesListDom = document.querySelector(".personajes");
  personajesListDom.innerHTML = "";
  personajesListDom.append(personajeDumy);
};
