function random(number) {
    return Math.ceil(Math.random() * number);
}
 
let ok = confirm('Угадай число от 1 до 100');

if (ok) {
    let number = random(100);
    let answer = prompt('Какое число я загадал?');
    answer.trim();
    if  (answer != null) {
        while (answer != number && answer != null) {
            if (answer != parseInt(answer)) {
                answer = prompt('Вводить нужно числа.  Какое число я загадал?');
                continue;
            }
            if (answer < number) {
                answer = prompt('Мало. Попробуй ещё раз!');
            }
            if (answer > number) {
                answer = prompt('Много. Попробуй ещё раз!');
            }
        }   
        if (answer == number) {
            alert('Верно! Это число ' + number + '.');
        }
    }
}
