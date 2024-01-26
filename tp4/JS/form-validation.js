function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function calcNbChar(id) {

    const input = document.getElementById(id); // pour sélectionner un élément HTML avec un identifiant spécifique (id) et le stocke dans la variable input
    const span = document.getElementById(`span-${id}`);// pour séléctionner un élément de type span avec un id 
    span.textContent = input.value.length + " car."; // Elle prend la longueur de la valeur saisie dans l'élément input
}
function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ''; for (const contact of contactList) {
        document.querySelector("table tbody").innerHTML +=
            `<tr>
    <td>${contact.name}</td>
    <td> ${contact.firstname} </td>
    <td> ${contact.date} </td>
    <td><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}" target="_blank">${contact.adress}</a></td>
    <td><a href="mailto:${contact.mail}?subject=Good Morning!&body=How are you doing?">${contact.mail}</a></td>
    <tr>`;
    } document.getElementById('List').textContent = `Listes des contacts (${contactList.length})`;
}
window.onload = function () {
    console.log("DOM ready!");
    displayContactList();


    const form = document.getElementById('form');

    form.addEventListener('submit', valider);
    document.getElementById('buttonGPS').addEventListener('click', function () {
        getLocation();
    });

    document.getElementById('delete').addEventListener('click', function () {
        contactStore.reset();
        displayContactList();
    });
}
function valider(e) {
    e.preventDefault();
    const nametxt = document.getElementById('name').value;
    const firstnametxt = document.getElementById('firstname').value;
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

    if (nametxt === "" && firstnametxt === "" && addresstxt === "" && mailtxt === "" && date_naissancetxt === "") {
        // Vérification des champs de texte si vides
        //vu que le titre du modal d'erreur est fixe, on l'a mis directement sur html
        //modalTitle.textContent = "Erreur dans le formulaire.\n"; // Définissez le contenu du titre        ErreurGlobal = "Tous les champs sont obligatoires.\n Veuillez remplir tous les champs du formulaire.";
        modalBody.textContent = ErreurGlobal;
        var MyModalEr = new bootstrap.Modal(errmodal_id);
        MyModalEr.show();

    } else if (ErreurGlobal == "") {
        if (nametxt.length < 5 || firstnametxt.length < 5 || addresstxt.length < 5) {
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
        } else {

            contactStore.add(nametxt, firstnametxt, date_naissancetxt, addresstxt, mailtxt);
            displayContactList();

            const message = document.getElementById('message');
            message.style.display = 'block';

        }
    }
}