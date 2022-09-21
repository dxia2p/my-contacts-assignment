// My Contacts Basic

class Contact{
  constructor(name, email, phone, country){
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.country = country;
  }
}

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

let contacts = loadContacts();
displayContacts();

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for(let i = 0; i < contacts.length; i++){
    outputStr += returnContactStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}


function addContact() {
  let name = prompt("ENETER NAME");
  let email = prompt("ENTER EMAIL");
  let phone = prompt("ENTER PHONE NUMBER");
  let country = prompt("ENTER COUNTRY");
  contacts.push(new Contact(name, email, phone, country));
  saveContacts();
}

function removeContact() {
  let deleteNumber = prompt("WHAT CONTACT TO DELETE?");
  contacts.splice(deleteNumber, 1);
}

function displayByName() {
  let name = prompt("ENTER NAME");
  let output = '';
  let j = 0;
  for(let i = 0; i < contacts.length; i++){
    if(contacts[i].name === name){
      output += returnContactStr(contacts[i], j);
      j++;
    }
  }
  outputEl.innerHTML = output;
}

function displayByCountry() {
  let country = prompt("ENTER COUNTR");
  let output = '';
  let j = 0;
  for(let i = 0; i < contacts.length; i++){
    if(contacts[i].country === country){
      output += returnContactStr(contacts[i], j);
      j++;
    }
  }
  outputEl.innerHTML = output;
}

function returnContactStr(contact, i){
  return `<div>
    ${i}: ${contact.name} <br>
    ${contact.email} <br>
    ${contact.phone} (${contact.country})
  </div>`;
}

function saveContacts(){
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts(){
  let contStr = localStorage.getItem("contacts");
  return JSON.parse(contStr) ?? [];
}
