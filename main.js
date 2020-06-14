let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money)); 
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false, 
    mission: 12345,
    period: 3,
    budget: money, 
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
        appData.addExpenses = addExpenses.toLowerCase().split(' ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let question = prompt('Введите обязательную статью расходов?');
            let amount;
            do {
                amount = +prompt('Во сколько это обойдется?');
                appData.expenses[question] = amount;
            } while (!isNumber(amount));
        }
    },
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        return sum;
    },
    getBudget: function() {
        return appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function() {
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода.');
        }
        if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода.');
        }
        if (appData.budgetDay >= 0 && appData.budgetDay <= 600 ) {
            return ('У вас низкий уровень дохода.');
        }
        if (appData.budgetDay < 0) {
            return ('Что то пошло не так.');
        }
    }
};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth();
appData.budgetMonth = appData.getBudget();
appData.budgetDay  = appData.budgetMonth / 30;

let typeOfMission = function() {
    if (appData.getTargetMonth() >= 0) {
        console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев.');
    } else {
        console.log('Цель не будет достигнута.');
    }
};

console.log('Расходы за месяц: ' + appData.expensesMonth + '.');
typeOfMission();
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');

for (let key in appData) {
    console.log('Ключ: ' + key + '. Значение: ' + appData[key] + '.');
}