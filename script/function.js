const globalData = {
  storedData: [],
  listFav: document.getElementById("listFav"),
  modale: document.getElementById("modale"),
  template: document.getElementById("modaleTemplate"),
  cloneModale: document.getElementById("cloneModale"),
};

export function openModal(title, desc, date, place, url) {
  const cardTemplate = globalData.template.content.cloneNode(true);
  cardTemplate.querySelector(".h3-title").textContent = title;
  cardTemplate.querySelector(".description").textContent = desc;
  cardTemplate.querySelector(".date").textContent = date;
  cardTemplate.querySelector(".place").textContent = place;
  cardTemplate.querySelector(".liens  ").href = url;
  globalData.modale.style.display = "flex";

  const closeBtn = cardTemplate.querySelector(".close-btn");
  globalData.cloneModale.appendChild(cardTemplate);

  closeBtn.addEventListener("click", () => {
    globalData.modale.style.display = "none";
    closeBtn.closest(".cardModale").remove();
  });
}

export function createEventCard(
  title,
  descr,
  date,
  place,
  url,
  actionClass,
  section,
  index
) {
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
  const actionBtn = document.createElement("button");

  divCard.className = "card";
  divTitleCard.className = "card-title";
  divInfo.className = "info";
  description.className = "descr";
  link.className = "url";
  divBtn.className = "button-card";
  detailBtn.className = "detail";
  actionBtn.className = "add";

  titleCard.textContent = title;
  description.textContent = descr;
  divDate.textContent = `Date : ${date}`;
  divPlace.textContent = place;
  link.href = url;
  link.textContent = "Lien vers l'événement";
  detailBtn.textContent = "Détails";
  actionBtn.textContent = actionClass;

  detailBtn.dataset.title = title;
  detailBtn.dataset.descr = descr;
  detailBtn.dataset.date = date;
  detailBtn.dataset.place = place;
  detailBtn.dataset.url = url;

  section.appendChild(divCard);
  divCard.appendChild(divTitleCard);
  divTitleCard.appendChild(titleCard);
  divCard.appendChild(divInfo);
  divInfo.appendChild(description);
  divInfo.appendChild(divDate);
  divInfo.appendChild(divPlace);
  divInfo.appendChild(link);
  divCard.appendChild(divBtn);
  divBtn.appendChild(detailBtn);
  divBtn.appendChild(actionBtn);

  detailBtn.addEventListener("click", (e) => {
    const dataFn = e.currentTarget.dataset;
    openModal(
      dataFn.title,
      dataFn.descr,
      dataFn.date,
      dataFn.place,
      dataFn.url
    );
  });

  actionBtn.addEventListener("click", () => {
    if (actionBtn.textContent === "Supprimer") {
      if (typeof index === "number") {
        globalData.storedData.splice(index, 1);
        localStorage.setItem("favData", JSON.stringify(globalData.storedData));
        globalData.listFav.removeChild(divCard);
      } else {
        console.warn("Impossible de supprimer : index non défini");
      }
    } else if (actionBtn.textContent === "Ajouter") {
      let storedData = JSON.parse(localStorage.getItem("favData")) || [];

      const newEvent = { title, descr, date, place, url };
      storedData.push(newEvent);
      localStorage.setItem("favData", JSON.stringify(storedData));
      globalData.storedData = storedData;

      // Ajoute immédiatement dans les favoris
      createEventCard(
        title,
        descr,
        date,
        place,
        url,
        "Supprimer",
        globalData.listFav,
        storedData.length - 1
      );
    }
  });

  return divCard;
}

export function getLocalStorage() {
  let storedData;
  try {
    storedData = JSON.parse(localStorage.getItem("favData")) || [];
  } catch (error) {
    console.error("Erreur:", error);
    storedData = [];
  }

  globalData.storedData = storedData;

  storedData.forEach((data, index) => {
    if (data.title && data.descr && data.date && data.place && data.url) {
      createEventCard(
        data.title,
        data.descr,
        data.date,
        data.place,
        data.url,
        "Supprimer",
        globalData.listFav,
        index
      );
    } else {
      console.error(index);
    }
  });
}
