import { getLocalStorage } from "./function.js";

const listEvent = document.getElementById("listEvent");
const listFav = document.getElementById("listFav");

const fetchData = fetch(
  "https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur réseau");
    }
    return response.json();
  })
  .then((data) => {
    data.events.forEach((event) => {
      const title = event.title;
      const descr = event.description;
      const date = event.date;
      let place;
      if (event.venue.address) {
        place = `Adresse : ${event.venue.address}, ${event.venue.city}`;
      } else {
        place = `Pas d'adresse disponible`;
      }
      const url = event.url;

      const divCard = document.createElement("div");
      const divTitleCard = document.createElement("div");
      const titleCard = document.createElement("h3");
      const divInfo = document.createElement("div");
      const description = document.createElement("p");
      const divDate = document.createElement("div");
      const divPlace = document.createElement("div");
      const link = document.createElement("a");
      const divBtn = document.createElement("div");
      const detailBtn = document.createElement("button");
      const addBtn = document.createElement("button");
      divCard.className = "card";
      divTitleCard.className = "card-title";
      divInfo.className = "info";
      description.className = "descr";
      link.className = "url";
      divBtn.className = "button-card";
      detailBtn.className = "detail";
      addBtn.className = "add";
      titleCard.textContent = title;
      description.textContent = descr;
      divDate.textContent = `Date : ${date}`;
      divPlace.textContent = `Lieux ${place}`;
      link.href = url;
      link.textContent = "Liens vers l'événement";
      addBtn.textContent = "Ajouter";
      detailBtn.textContent = "Détails";
      listEvent?.appendChild(divCard);
      divCard.appendChild(divTitleCard);
      divTitleCard.appendChild(titleCard);
      divCard.appendChild(divInfo);
      divInfo.appendChild(description);
      divInfo.appendChild(divDate);
      divInfo.appendChild(divPlace);
      divInfo.appendChild(link);
      divCard.appendChild(divBtn);
      divBtn.appendChild(detailBtn);
      divBtn.appendChild(addBtn);

      addBtn.addEventListener("click", () => {
        let storedData = JSON.parse(localStorage.getItem("favData")) || [];
        storedData.push({
          titre: title,
          description: descr,
          horaire: date,
          lieux: place,
          liens: url,
        });
        localStorage.setItem("favData", JSON.stringify(storedData));
        getLocalStorage(listFav);
      });
    });
    getLocalStorage(listFav);
  });
