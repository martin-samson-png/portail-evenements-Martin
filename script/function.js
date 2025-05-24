export function getLocalStorage(listFav) {
  let storedData = JSON.parse(localStorage.getItem("favData")) || [];

  storedData.forEach((data, index) => {
    const favDivCard = document.createElement("div");
    const favDivTitleCard = document.createElement("div");
    const favTitleCard = document.createElement("h3");
    const favDivInfo = document.createElement("div");
    const favDescription = document.createElement("p");
    const favDivDate = document.createElement("div");
    const favDivPlace = document.createElement("div");
    const favLink = document.createElement("a");
    const favDivBtn = document.createElement("div");
    const favDetailBtn = document.createElement("button");
    const favSuppBtn = document.createElement("button");

    favDivCard.className = "card";
    favDivTitleCard.className = "card-title";
    favDivInfo.className = "info";
    favDescription.className = "descr";
    favLink.className = "url";
    favDivBtn.className = "button-card";
    favDetailBtn.className = "detail";
    favSuppBtn.className = "add";

    favTitleCard.textContent = data.titre;
    favDescription.textContent = data.description;
    favDivDate.textContent = data.horaire;
    favDivPlace.textContent = data.lieux;
    favLink.textContent = data.liens;
    favDetailBtn.textContent = "Détails";
    favSuppBtn.textContent = "Supprimer";

    listFav.appendChild(favDivCard);
    favDivCard.appendChild(favDivTitleCard);
    favDivTitleCard.appendChild(favTitleCard);
    favDivCard.appendChild(favDivInfo);
    favDivInfo.appendChild(favDescription);
    favDivInfo.appendChild(favDivDate);
    favDivInfo.appendChild(favDivPlace);
    favDivInfo.appendChild(favLink);
    favDivCard.appendChild(favDivBtn);
    favDivBtn.appendChild(favDetailBtn);
    favDivBtn.appendChild(favSuppBtn);

    favSuppBtn.addEventListener("click", () => {
      storedData.splice(index, 1);
      localStorage.setItem("favData", JSON.stringify(storedData));
      listFav.removeChild(favDivCard);
    });
  });
}
