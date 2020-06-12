let money = 1200;
let income = 'макдоналдс';
let addExpenses = 'Интернет, Такси, Коммуналка, Еда';
let deposit = true;
let budgetMonth;
let complete;
const mission = 2345;
const period = 3;
let amount1, amount2, expenses1, expenses2;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + (mission) + ' рублей/долларов/гривен/юани');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(addExpenses.toLowerCase(addExpenses.split(', ')));

money = prompt('Ваш месячный доход?', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

budgetMonth = +money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

complete = mission / budgetMonth;
console.log('Через ' + Math.ceil(complete) + ' месяцев цель будет выполнена.');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день = ' + budgetDay);

if (budgetDay > 0) {
    if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    }
    if (budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }
    if ((budgetDay < 1200) && (budgetDay > 600)) {
        console.log('У вас средний уровень дохода');
    }
} else {
    console.log('Что то пошло не так');
}
