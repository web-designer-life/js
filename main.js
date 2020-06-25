let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'), 
    incomeAddBtn = document.getElementsByTagName('button')[0],
    expensesAddBtn = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');    

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function(str) {
    return !(str === null || str === '' || isNumber(str));
};

let appData = {
    budget: 0, 
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {}, 
    expensesMonth: 0,
    addExpenses: [],
    deposit: false, 
    percentDeposit: 0,
    moneyDeposit: 0,  
    start : function() {   
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getInfoDeposit();
        this.expensesMonth = this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();   
        this.getBudget();
        this.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = this.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomeAddBtn.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
        });
    },
    getIncome: function() {
        incomeItem.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
        });
    }, 
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        return sum;
    },
    getBudget: function() {
        this.budgetMonth = +this.budget +  this.incomeMonth - this.expensesMonth;
        this.budgetDay  = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function(){
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода.');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода.');
        } else if (this.budgetDay >= 0 && this.budgetDay <= 600 ) {
            return ('У вас низкий уровень дохода.');
        } else {
            return ('Что-то не так.');
        }
    },
    getInfoDeposit: function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '1000');
            } 
            while (!isNumber(this.percentDeposit));
      
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
            } 
            while (!isNumber(this.moneyDeposit));
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    reset: function(){   
        location.reload();
    }
};

if (salaryAmount.value === '') {
    start.setAttribute('disabled', true);
}
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value === '') {
        start.setAttribute('disabled', true);
    } else {
        start.removeAttribute('disabled');
    }
});
start.addEventListener('click', appData.start);
cancel.addEventListener('click', appData.reset);
expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
    periodAmount.textContent = periodSelect.value;
});

for (let i = 0; i < appData.addExpenses.length; i++) {
    appData.addExpenses[i] = appData.addExpenses[i].trim();
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
}