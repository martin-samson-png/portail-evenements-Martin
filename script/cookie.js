const body = document.body;

function setCookie(cle, valeur, jours) {
  let date = new Date();
  date.setTime(date.getTime() + jours * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = cle + "=" + valeur + ";" + expires + ";path=/";
}

function getCookie(cle) {
  let name = cle + "=";
  let decodeCookie = decodeURI(document.cookie);
  let ca = decodeCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function darkMode(active) {
  if (active) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let modeSombre = getCookie("modeSombre");
  if (modeSombre === "true") {
    darkMode(true);
  }
});

const buttonTheme = document.getElementById("darkMode");
buttonTheme.addEventListener("click", function () {
  let modeSombre = getCookie("modeSombre");
  if (modeSombre === "true") {
    setCookie("modeSombre", "false", 365);
    darkMode(false);
  } else {
    setCookie("modeSombre", "true", 365);
    darkMode(true);
  }
});
