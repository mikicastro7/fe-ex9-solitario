/* eslint-disable no-undef */
const personajesDom = () => {
  const personajeDumy = document.querySelector(".personaje-dummy");
  let i = 0;
  const cardsInterval = setInterval(() => {
    const personajeCloneDumy = personajeDumy.cloneNode(true);
    personajeDumy.before(datosNodoPersonajeDom(personajes[i], personajeCloneDumy, i, cardsInterval));
    i++;
    if (i === personajes.length) clearInterval(cardsInterval);
  }, 1000);
};

const datosNodoPersonajeDom = (personaje, nodoPersonaje, i, cardsInterval) => {
  nodoPersonaje.querySelector(".morir")
    .addEventListener("click", () => { matarPersonajeEvent(i, cardsInterval); });
  nodoPersonaje.querySelector(".comunicar")
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
  nodoPersonaje.querySelector(".edad").textContent = personaje.edad;
  setDatosTipoPersonaje(personaje, nodoPersonaje);
  return nodoPersonaje;
};

const setDatosTipoPersonaje = (personaje, nodoPersonaje) => {
  if (personaje instanceof Rey) {
    nodoPersonaje.querySelector(".emoji").textContent = "👑";
    const anyosReinado = nodoPersonaje.querySelector(".anyos-reinado");
    anyosReinado.firstElementChild.innerHTML = personaje.anyosReinado;
    setDatosTipoDom([anyosReinado], nodoPersonaje);
  } else if (personaje instanceof Luchador) {
    nodoPersonaje.querySelector(".emoji").textContent = "🗡";
    const arma = nodoPersonaje.querySelector(".arma");
    arma.firstElementChild.innerHTML = personaje.arma;
    const destreza = nodoPersonaje.querySelector(".destreza");
    destreza.firstElementChild.innerHTML = personaje.destreza;
    setDatosTipoDom([destreza, arma], nodoPersonaje);
  } else if (personaje instanceof Asesor) {
    nodoPersonaje.querySelector(".emoji").textContent = "🎓";
    const asesora = nodoPersonaje.querySelector(".asesora");
    asesora.firstElementChild.innerHTML = personaje.personajeAsesora.nombre;
    setDatosTipoDom([asesora], nodoPersonaje);
  } else if (personaje instanceof Escudero) {
    nodoPersonaje.querySelector(".emoji").textContent = "🛡";
    const peloteo = nodoPersonaje.querySelector(".peloteo");
    peloteo.firstElementChild.innerHTML = personaje.gradoPelotismo;
    const sirve = nodoPersonaje.querySelector(".sirve");
    sirve.firstElementChild.innerHTML = personaje.personajeSirve.nombre;
    setDatosTipoDom([peloteo, sirve], nodoPersonaje);
  }
};

const setDatosTipoDom = (nodosDom, nodoPersonaje) => {
  // eslint-disable-next-line guard-for-in
  const listDatos = nodoPersonaje.querySelector(".lista-datos");
  listDatos.innerHTML = "";
  for (const nodo of nodosDom) {
    listDatos.append(nodo);
  }
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

const limpiarListaPersonajesDom = () => {
  const personajesListDom = document.querySelector(".personajes");
  const personajeDumy = document.querySelector(".personaje-dummy");
  personajesListDom.innerHTML = "";
  personajesListDom.append(personajeDumy);
};
