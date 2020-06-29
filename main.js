const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function(str) {
    return !(str === null || str === '' || isNumber(str));
};

const start = document.getElementById('start'),
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
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');
    
let expensesItems = document.querySelectorAll('.expenses-items'),    
    incomeItem = document.querySelectorAll('.income-items');   

class AppData {
    constructor () {
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
    }

    check() {
        start.setAttribute("disabled", true);
    }

    start() { 
        start.style.display = 'none';
        cancel.style.display = 'block';
        const allDataInputs = document.querySelectorAll('.data [type="text"]');
        allDataInputs.forEach(item => {
            item.setAttribute('disabled', true);   
        });
        depositCheck.setAttribute('disabled', true);
        periodSelect.setAttribute('disabled', true);
        expensesAddBtn.setAttribute('disabled', true);
        incomeAddBtn.setAttribute('disabled', true);  
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getInfoDeposit();
        this.expensesMonth = this.getExpensesMonth();
        this.getAddExpInc();
        this.getBudget();
        this.showResult();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    addExpBlock(btn) {
        const cloneItem = expensesItems[0].cloneNode(true);
        cloneItem.querySelectorAll('input').forEach(item => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneItem, btn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btn.style.display = 'none';
        }   
    }

    addIncBlock(btn) {
        const cloneItem = incomeItem[0].cloneNode(true);
        cloneItem.querySelectorAll('input').forEach(item => {
            item.value = '';
        });
        incomeItem[0].parentNode.insertBefore(cloneItem, btn);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            btn.style.display = 'none';
        }   
    }
    
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };
        incomeItem.forEach(count);
        expensesItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc() {
        const getAdd = (addItems, addValue) => {
            addItems.forEach(item => {
                if (typeof item === 'object') {
                    item = item.value.trim();
                } else {
                    item = item.trim();
                }
                if (item !== '') {
                    addValue.push(item);
                }
            });
        };
        const addExpenses = additionalExpensesItem.value.split(',');
        getAdd(additionalIncomeItem, this.addIncome);
        getAdd(addExpenses, this.addExpenses);
    }  

    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        return sum;
    }

    getBudget() {
        if (this.percentDeposit > 1) {
            this.percentDeposit = this.percentDeposit / 100;
        }
        const monthDeposit = this.moneyDeposit * this.percentDeposit;
        this.budgetMonth = +this.budget +  this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay  = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >= 0 && this.budgetDay <= 600 ) {
            return ('У вас низкий уровень дохода');
        } else {
            return ('Ой((');
        }
    }

    getInfoDeposit() {
        if (this.deposit) {      
            this.percentDeposit = depositPercent.value;     
            this.moneyDeposit =  depositAmount.value; 
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    reset() {   
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
        depositPercent.style.display = 'none';
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
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        start.setAttribute("disabled", true);
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.disabled = false;
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('change', () => {
                if (!(isNumber(depositPercent.value) && depositPercent.value > 0 && depositPercent.value < 100)) {
                    alert('Введите корректное значение процента');
                } else {
                    start.removeAttribute("disabled");
                }
            });    
        } else {
            depositPercent.disabled = true;
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    eventsListeners() {
        this.check();
        start.addEventListener('click', this.start.bind(this)); 
        cancel.addEventListener('click', this.reset);
        expensesAddBtn.addEventListener('click', () => {
            this.addExpBlock(expensesAddBtn);
        });
        incomeAddBtn.addEventListener('click', () => {
            this.addIncBlock(incomeAddBtn);
        });
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        }); 
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value === '') {
                start.setAttribute("disabled", true);
            } else {
                start.removeAttribute("disabled");
            }
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

const appData = new AppData();
appData.eventsListeners();