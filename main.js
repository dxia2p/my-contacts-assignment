// My Contacts Basic

class Contact{ // Contact class
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
  }else if(selection === 'search-email'){
    displayByEmail();
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
  // gets data
  let email = prompt("ENTER EMAIL");
  if(findByEmail(email) != -1){ // checks if email is already taken
    outputEl.innerHTML = "Email Already in use (" + email + ")";
    return;
  }
  let name = prompt("ENTER NAME");
  let phone = prompt("ENTER PHONE NUMBER");
  let country = prompt("ENTER COUNTRY");
  // adds contact to contacts array
  contacts.push(new Contact(name, email, phone, country));
  saveContacts();
  outputEl.innerHTML = "New Contact Added (" + name + ")";
}

function removeContact() {
  let email = prompt("ENTER EMAIL OF CONTACT TO DELETE");
  let index = findByEmail(email);
  if(index === -1){ // checks if email exists
    outputEl.innerHTML = "Email does not exist";
    return;
  }
  contacts.splice(index, 1); // remove contact from array
  saveContacts();
  outputEl.innerHTML = "Contact Removed (" + email + ")";
}

function displayByName() {
  let name = prompt("ENTER NAME");
  let output = '';
  let idx = 0;
  for(let i = 0; i < contacts.length; i++){ // loop through all contacts and if input is a substring of the contact's name, display it
    if(contacts[i].name.includes(name)){
      output += returnContactStr(contacts[i], idx);
      idx++;
    }
  }
  outputEl.innerHTML = output;
}

function displayByCountry() {
  let country = prompt("ENTER COUNTRY");
  let output = '';
  let j = 0;
  for(let i = 0; i < contacts.length; i++){ // loops through all contacts and checks if the contact's country matches the country inputed
    if(contacts[i].country === country){
      output += returnContactStr(contacts[i], j);
      j++;
    }
  }
  outputEl.innerHTML = output;
}

function displayByEmail(){
  let email = prompt("ENTER EMAIL");
  let emailIdx = findByEmail(email);
  if(emailIdx !== -1){
    outputEl.innerHTML = returnContactStr(contacts[emailIdx], 0);
  }else{
    outputEl.innerHTML = "";
  }
}

// helper functions
function returnContactStr(contact, i){
  // returns a string with all the contact's information in html
  return `<div>
    ${i}: ${contact.name} <br>
    ${contact.email} <br>
    ${contact.phone} (${contact.country})
  </div>`;
}

function findByEmail(email){
  for(let i = 0; i < contacts.length; i++){
    if(contacts[i].email === email){
      return i;
    }
  }
  return -1;
}
// Saves and loads data from local storage
function saveContacts(){
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts(){
  let contStr = localStorage.getItem("contacts");
  return JSON.parse(contStr) ?? [];
}
