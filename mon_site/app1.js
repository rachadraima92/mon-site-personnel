// Récupération des éléments du DOM
const form = document.querySelector('form');
const nom = document.querySelector('#nom');
const email = document.querySelector('#email');
const objet = document.querySelector('#objet');
const message = document.querySelector('#note');

// Écouteur d'événement sur la soumission du formulaire
form.addEventListener('submit', e => {
    e.preventDefault();
    form_verify();
});

// Fonction de validation du formulaire
function form_verify() {
    // Obtention des valeurs des champs
    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const objetValue = objet.value.trim();
    const messageValue = message.value.trim();

    let errorExist = false;
    // console.log("okoko",errorExist);
    // Validation du nom
    if (nomValue === "") {
        setError(nom, "Le nom ne peut pas être vide.");
        errorExist = true;
    } else if (!nomValue.match(/^[a-zA-Z]/)) {
        setError(nom, "Le nom doit commencer par une lettre.");
        errorExist = true;
    } else if (nomValue.length < 3) {
        setError(nom, "Le nom doit contenir au moins 3 caractères.");
        errorExist = true;
    }
    else if(nomValue.length > 20) {
        setError(nom,"Le nom ne peut dépasser plus de 20 caractères.");
        errorExist = true;
    } else {
        setSuccess(nom);
        errorExist = false;
    }

    // Validation de l'e-mail
    if (emailValue === "") {
        setError(email, "L'e-mail ne peut pas être vide.");
        errorExist = true;
    } else if (!email_verify(emailValue)) {
        setError(email, "L'e-mail n'est pas valide.");
        errorExist = true;
    } else {
        setSuccess(email);
        errorExist = false;
    }

    // Validation de l'objet
    if (objetValue === "") {
        setError(objet, "L'objet ne peut pas être vide.");
        errorExist = true;
    } else if (!objetValue.match(/^[a-zA-Z]/)) {
        setError(objet, "L'objet doit commencer par une lettre.");
        errorExist = true;
    } else if (objetValue.length < 3) {
        setError(objet, "Le nom doit contenir au moins 3 caractères.");
        errorExist = true;
    } else {
        setSuccess(objet);
        errorExist = false;
    }

    // Validation du message
    if (messageValue === "") {
        setError(message, "Le message ne peut pas être vide.");
        errorExist = true;
    } else if (messageValue.length > 500){
        setError (message, "Le message ne doit pas dépasser plus de 500 caractères.");
        errorExist = true;
    } else {
        setSuccess(message);
        errorExist = false;
    }

    // Si il n'ya aucune erreur , alors on soumet les données vers php
    // console.log(errorExist);

    if(!errorExist){
        // console.log("ohohoho");
        form.submit();
    }
}

// Fonction pour définir un champ comme étant en erreur
function setError(elm, msg) {
    const user = elm.parentElement;
    const small = user.querySelector('small');
    small.innerText = msg;
    user.classList.remove('success');
    user.classList.add('error');
}

// Fonction pour définir un champ comme étant en succès
function setSuccess(elm) {
    const user = elm.parentElement;
    user.classList.remove('error');
    user.classList.add('success');
}

// Fonction pour vérifier l'e-mail à l'aide d'une expression régulière
function email_verify(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}
