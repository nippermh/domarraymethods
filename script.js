//ADD USER
//grab the buttons ids
//create data as an array
//generate random users from api with first and last name
//show people with wealth formatted as money
//generate random wealth and add them to the DOM
//forEach used to iterate

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  //returns a promise so we must await it
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
//  console.log(data);
//create a new user and set it to the data we get back
//we want the first item in the results array
  const user = data.results[0]; 

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  console.log(newUser);
  addData(newUser);
}
//DOUBLE MONEY - map array method
//uses map to loop through an array
//returns an array from it
//doubling the amount of money manipulate the items
//Double everyones money - map through and reassign the value
function doubleMoney() {
  //for each user return an object, everything in the user object ...
  data = data.map((user) => {
    return {...user, money: user.money * 2}
  });

  updateDOM();
}
//SORT BY RICHEST
//show richest person at top
//to make it ascending order rather than descending we reverse b - a
function sortByRichest() {
  data.sort((a,b) => b.money - a.money);

  updateDOM(); 
}
//FILTER
//filter out anyone who doesn't have at least a million dollars
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}
//REDUCE
//calculate entire wealth
//Add a new obj into data array
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

function addData(obj) {
  data.push(obj);

  updateDOM(); //if nothing is passed in we use data below
}

//display the users in the DOM
function updateDOM(providedData = data) {
  //clear the main div
  main.innerHTML ='<h2><strong>Person</strong> Wealth</h2>'; //clears it
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money)}`;
    main.appendChild(element);
  });
}
//format number as money
//see: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}
//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);





