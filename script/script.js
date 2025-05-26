import { getLocalStorage, createEventCard } from "./function.js";

const globalData = {
  listEvent: document.getElementById("listEvent"),
  modale: document.getElementById("modale"),
};

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
      const descr = event.description.replace(/<p>|<\/p>/g, "");
      const date = event.date;
      let place;
      if (event.venue.address) {
        place = `Adresse : ${event.venue.address}, ${event.venue.city}`;
      } else {
        place = `Pas d'adresse disponible`;
      }
      const url = event.url;

      createEventCard(
        title,
        descr,
        date,
        place,
        url,
        "Ajouter",
        globalData.listEvent
      );
    });
    getLocalStorage();
  });
