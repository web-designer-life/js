var money = 1200;
var income = 'макдоналдс';
let addExpenses = 'Интернет, Такси, Коммуналка, Еда';
let deposit = true;
const mission = 2345;
const period = 3;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + (mission) + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(addExpenses.toLowerCase(addExpenses.split(', ')));

let budgetDay = money / 30;

console.log(budgetDay);