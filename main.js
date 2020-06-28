const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function(str) {
    return !(str === null || str === '' || isNumber(str));
};

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

const AppData = function() {
    this.budget  = 0; 
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false; 
    this.percentDeposit = 0;
    this.moneyDeposit = 0;  
};

AppData.prototype.check = function() {
    start.setAttribute("disabled", true);
};

AppData.prototype.start = function() { 
    start.style.display = 'none';
    cancel.style.display = 'block';
    depositCheck.setAttribute('disabled', true);
    periodSelect.setAttribute('disabled', true);
    let allDataInputs = document.querySelectorAll('.data [type="text"]');
    allDataInputs.forEach(function(item){
        item.setAttribute('disabled', true);   
    });
    expensesAddBtn.setAttribute('disabled', true);
    incomeAddBtn.setAttribute('disabled', true);  
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getInfoDeposit();
    this.expensesMonth = this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();   
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult =  function() {
    let _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = _this.calcPeriod();
    });
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function(item){
        item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesAddBtn.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function(item){
        item.value = '';
    });
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
        incomeAddBtn.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function() {
    incomeItem.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    }, this);
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};

AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
}; 

AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }
    return sum;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = +this.budget +  this.incomeMonth - this.expensesMonth;
    this.budgetDay  = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } 
    else if (this.budgetDay > 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } 
    else if (this.budgetDay >= 0 && this.budgetDay <= 600 ) {
        return ('У вас низкий уровень дохода');
    } 
    else {
        return ('Ой((');
    }
};

AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        } 
        while (!isNumber(this.percentDeposit));
        do {
            this.moneyDeposit = prompt('Какая сумма заложена', '10');
        } 
        while (!isNumber(this.moneyDeposit));
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function(){   
    start.style.display = 'block';
    cancel.style.display = 'none';
    let allDataInputs = document.querySelectorAll('.data [type="text"]');
    allDataInputs.forEach(function(item){
        item.removeAttribute("disabled"); 
        item.value = "";
    });
    periodSelect.removeAttribute("disabled");
    expensesAddBtn.removeAttribute("disabled");
    incomeAddBtn.removeAttribute("disabled");
    depositCheck.removeAttribute("disabled");
    budgetMonthValue.value = 0;
    budgetDayValue.value = 0;
    expensesMonthValue.value = 0;
    incomePeriodValue.value = 0;
    targetMonthValue.value = "Срок";
    additionalIncomeValue.value = "Наименования";
    additionalExpensesValue.value = "Наименования";
    periodSelect.value = 1;
    periodAmount.textContent = "1";
    depositCheck.checked = false;
    for (let i = incomeItem.length - 1; i > 0; i--) {
        incomeItem[i].remove();
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[i].remove();
    }
    incomeAddBtn.style.display = 'block';
    expensesAddBtn.style.display = 'block';
    start.setAttribute("disabled", true);
};

AppData.prototype.eventsListeners = function() {
    this.check();
    start.addEventListener('click', this.start.bind(this)); 
    cancel.addEventListener('click', this.reset);
    expensesAddBtn.addEventListener('click', this.addExpensesBlock);
    incomeAddBtn.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function(){
        periodAmount.textContent = periodSelect.value;
    }); 
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value === '') {
            start.setAttribute("disabled", true);
        } 
        else {
            start.removeAttribute("disabled");
        }
    });
};

const appData = new AppData();

appData.eventsListeners();