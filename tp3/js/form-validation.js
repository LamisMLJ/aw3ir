function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} window.onload = function () {
    console.log("DOM ready!");

    const form = document.getElementById('form');

    form.addEventListener('submit', valider);
}
function valider(e) {
    e.preventDefault();
    const nametxt = document.getElementById('name').value;
    const firstnametxt = document.getElementById('firstname').value;
    const codepostaltxt = document.getElementById('code-postal').value;
    const regiontxt = document.getElementById('region').value;
    const date_naissancetxt = document.getElementById('date_naissance').value;
    const mailtxt = document.getElementById('mail').value;
    const addresstxt = document.getElementById('address').value;    // Récupérez l'élément du titre et body du modal

    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body-err');
    const modalValidTitle = document.querySelector('.modal-title-valid');
    const modalValidBody = document.querySelector('.modal-body-valid');

    //déclaration des variables pour l'affectation de l'ID de chaque modal sert à l'affichage
    const validmodal_id = document.getElementById('myValidModal');
    const errmodal_id = document.getElementById('myModal');    // Vérification de la dte de naissance
    const birthdayDate = new Date(date_naissancetxt);
    const birthdayTimestamp = birthdayDate.getTime();
    const nowTimestamp = Date.now();    //déclarer les messags d'erreurs

    var messagerr = "";
    var errmail = "";
    var errdatenaissance = "";
    var ErreurGlobal = "";
    var total = "";    //Tous les champs sont obligatoires. Veuillez remplir tous les champs du formulaire.

    if (nametxt === "" && firstnametxt === "" && addresstxt === "" && codepostaltxt === "" && mailtxt === "" && date_naissancetxt === "" && regiontxt === "") {
        // Vérification des champs de texte si vides
        //vu que le titre du modal d'erreur est fixe, on l'a mis directement sur html
        //modalTitle.textContent = "Erreur dans le formulaire.\n"; // Définissez le contenu du titre        ErreurGlobal = "Tous les champs sont obligatoires.\n Veuillez remplir tous les champs du formulaire.";
        modalBody.textContent = ErreurGlobal;
        var MyModalEr = new bootstrap.Modal(errmodal_id);
        MyModalEr.show();

    } else if (ErreurGlobal == "") {
        if (nametxt.length < 5 || firstnametxt.length < 5 || addresstxt.length < 5 || codepostaltxt.length < 5 || regiontxt.length < 5) {
            messagerr = "chaque champ doit contenir au moins 5 caractères. <br>"
        }
        if (birthdayTimestamp > nowTimestamp) {
            errdatenaissance = "La date de naissance ne peut pas être dans le future.<br>";
        }
        // Vérification du format de l'e-mail
        if (!validateEmail(mailtxt)) {
            errmail = "L'adresse e-mail n'est pas au bon format.<br>";
        }
        total = messagerr + errdatenaissance + errmail;
        modalBody.innerHTML = total;
        // on a mis cette condition pour que s'il y a au moins un champs non vide, donc pas erreur globale, le modal s'affiche
        if (total !== "") {
            var MyModalEr = new bootstrap.Modal(errmodal_id);
            MyModalEr.show();
        } else {            // Construire le message à afficher dans le modal
            const message = "Bonjour, " + nametxt + " " + firstnametxt;
            modalValidTitle.textContent = message;
            /*<p>Date de naissance: ${date_naissancetxt}</p>
            <p>Email: ${mail}</p>
            <p>Adresse: ${address}</p>
            <p>Code Postal: ${codePostal}</p>*/            modalValidBody.textContent = "vous etes né.é le " + date_naissancetxt; var img = document.createElement('img');
            var URL_map = "https://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(addresstxt)
                + "&markers=color:red%7Clabel:C%7C" + encodeURIComponent(addresstxt)
                + "&zoom=13&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
            img.src = URL_map;
            modalValidBody.appendChild(img);
            var lienhypertxt = document.createElement('p');
            var linkGMaps = document.createElement('a');
            linkGMaps.href = "https://www.google.com/maps/search/" + encodeURIComponent(addresstxt);
            linkGMaps.innerHTML = addresstxt;
            lienhypertxt.appendChild(linkGMaps);
            modalValidBody.appendChild(lienhypertxt);
            var ValidModal = new bootstrap.Modal(validmodal_id);
            ValidModal.show();
        }
    }
}