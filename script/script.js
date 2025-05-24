const listEvent = document.getElementById("listEvent");

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
      const divDate = document.createElement("div");
      const divPlace = document.createElement("div");
      const divBtn = document.createElement("div");
      const detailBtn = document.createElement("button");
      const addBtn = document.createElement("button");
      divCard.className = "card";
      divTitleCard.className = "card-title";
      divInfo.className = "info";
      divBtn.className = "button-card";
      detailBtn.className = "detail";
      addBtn.className = "add";
      titleCard.textContent = title;
      divDate.textContent = date;
      divPlace.textContent = place;
      addBtn.textContent = "Ajouter";
      detailBtn.textContent = "Détails";
      listEvent?.appendChild(divCard);
      divCard.appendChild(divTitleCard);
      divTitleCard.appendChild(titleCard);
      divCard.appendChild(divInfo);
      divInfo.appendChild(divDate);
      divInfo.appendChild(divPlace);
      divCard.appendChild(divBtn);
      divBtn.appendChild(detailBtn);
      divBtn.appendChild(addBtn);
    });
  });
