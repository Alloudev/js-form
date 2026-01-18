// Bouton light/dark
const btn = document.getElementById("themeToggle");
const html = document.documentElement;

btn.addEventListener("click", () => {
  // Vérifie si la page est déjà en dark soit par classe, soit par système (merci l'IA pour celle-là)
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const hasDarkClass = html.classList.contains("force-dark");
  const hasLightClass = html.classList.contains("force-light");

  // État actuel effectif
  const isCurrentlyDark = hasDarkClass || (!hasLightClass && isSystemDark);

  if (isCurrentlyDark) {
    // Si la page est en dark, ça force le light
    html.classList.remove("force-dark");
    html.classList.add("force-light");
  } else {
    // Sinon ça force le dark
    html.classList.remove("force-light");
    html.classList.add("force-dark");
  }
});

// Logique formulaire
const nameInput = document.getElementById("name");
const minChars = document.getElementById("mincharsvalue");
const nameError = document.getElementById("name_error");
const mailInput = document.getElementById("email");
const mailError = document.getElementById("mail_error");
const mailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password_error");
const submitBTN = document.getElementById("submit_btn");
const formulaire = document.querySelector(".form_wrapper");
const success = document.getElementById("success_div");
const afterSuccess = document.getElementById("after_success");
const returnBTN = document.getElementById("return_to_form");
const max = 8;

minChars.textContent = max;

nameInput.addEventListener("input", () => {
  if (nameInput.value.length <= max) {
    const restant = max - nameInput.value.length;
    minChars.textContent = restant;
    console.log(minChars.textContent);
  } else if (nameInput.value.length >= max) {
    minChars.textContent = 0;
  }
});

// Petite personnalisation de l'encadré qui dit "Please fill out this field." quand on hover les inputs

nameInput.setCustomValidity("Entrez votre nom Mr.Loïc (oups)");
mailInput.setCustomValidity("Entrez votre adresse e-mail");
passwordInput.setCustomValidity("Entrez votre mot de passe");

//Cette partie je la comprend mais je serais incapable de la refaire
const inputsMap = [
  { input: nameInput, error: nameError },
  { input: mailInput, error: mailError },
  { input: passwordInput, error: passwordError },
];

inputsMap.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    error.textContent = "";
    input.setCustomValidity("");
  });
});

submitBTN.addEventListener("click", async function (e) {
  // C'est quoi ça ? (RE: le e je comprend pas mais dans l'ensemble c'est pour vérifier que le name fait plus de 8 caractères, sinon ça renvoi une alerte.

  e.preventDefault();
  if (nameInput.value.length < max) {
    nameError.textContent =
      "Votre nom doit contenir au minimum 8 caractères, il contient actuellement " +
      (0 + nameInput.value.length) +
      " caractères";
  } else if (!mailRegex.test(mailInput.value)) {
    mailError.textContent = "Veuillez saisir une adresse e-mail valide !";
  } else if (!passwordInput.value) {
    passwordError.textContent = "Veuillez saisir un mot de passe !";
  } else if (passwordInput.value.length < 10) {
    passwordError.textContent =
      "Votre mot de passe doit faire 10 caractères minimum";
  } else {
    submitBTN.disabled = true;
    success.classList.add("active");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    formulaire.style.display = "none";
    afterSuccess.style.display = "flex";
  }
});

returnBTN.addEventListener("click", () => {
  location.reload(
    true,
  ); /* true reload sans cache, utile pour clear les inputs */
});
