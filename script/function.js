const modale = document.getElementById("modale");
const template = document.getElementById("modaleTemplate");
const cloneModale = document.getElementById("cloneModale");
const listFav = document.getElementById("listFav");

export function openModal(title, desc, date, place, url) {
  const cardTemplate = template.content.cloneNode(true);
  cardTemplate.querySelector(".h3-title").textContent = title;
  cardTemplate.querySelector(".description").textContent = desc;
  cardTemplate.querySelector(".date").textContent = date;
  cardTemplate.querySelector(".place").textContent = place;
  cardTemplate.querySelector(".url").href = url;
  modale.style.display = "flex";

  const closeBtn = cardTemplate.querySelector(".close-btn");
  cloneModale?.appendChild(cardTemplate);

  closeBtn.addEventListener("click", () => {
    modale.style.display = "none";
    closeBtn.closest(".card").remove();
  });
}

export function createEventCard({
  title,
  descr,
  date,
  place,
  url,
  actionClass,
  section,
}) {
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
  actionBtn.className = actionClass;

  titleCard.textContent = title;
  description.textContent = descr;
  divDate.textContent = `Date : ${date}`;
  divPlace.textContent = place;
  link.href = url;
  link.textContent = "Lien vers l'événement";
  detailBtn.textContent = "Détails";
  actionBtn.textContent = actionClass;

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
      storedData.splice(index, 1);
      localStorage.setItem("favData", JSON.stringify(storedData));
      listFav.removeChild(favDivCard);
    }
  });
  return divCard;
}
export function getLocalStorage(l) {
  let storedData = JSON.parse(localStorage.getItem("favData")) || [];
  storedData.forEach((data, index) => {
    createEventCard(
      data.title,
      data.description,
      data.date,
      data.place,
      data.url,
      "Supprimer",
      listFav
    );
  });
}
