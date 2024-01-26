/*
store.js
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_name, _firsname, _date, _adress, _mail);
Pour récuper la liste:    contactStore.getList();
*/
var contactStore = (function () {
    // variable privée
    let contactListString = localStorage.getItem('contactList')/* localStorage du navigateur pour récupérer une chaîne de caractères associée à la clé 'contactList'.*/
    /*récupère la valeur stockée associée 'contactList'.*/
    /*contactList est une variable qui stocke une liste de contacts. Elle est initialisée à partir des données récupérées depuis localStorage.*/
    var contactList = contactListString ? JSON.parse(contactListString) : []; /*contactListString est définie (différente de null ou undefined). Si c'est le cas ya une donnée, elle utilise JSON.parse() pour convertir la chaîne JSON récupérée en un tableau JavaScript*/
    /*JSON.parse() est une fonction native en JavaScript qui convertit une chaîne de caractères JSON en un objet JavaScript correspondant.*/
    // Expose these functions via an interface while hiding
    // the implementation of the module within the function() block

    return {
        add: function (_name, _firsname, _date, _adress, _mail) {
            var contact = {
                name: _name,
                firstname: _firsname,
                date: _date,
                adress: _adress,
                mail: _mail,
            };
            // ajout du contact à la liste
            contactList.push(contact);

            // persistence de la liste dans une base de données local du navigateur web
            // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
            localStorage.setItem('contactList', JSON.stringify(contactList));

            return contactList;
        },
        reset: function () {

            localStorage.removeItem('contactList');

            return contactList;
        },

        getList: function () {
            return contactList;
        },
    };
})();