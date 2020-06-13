function random(number) {
    return Math.ceil(Math.random() * number);
}

function game(answer, number) {
    if  (answer != null) {
        if (answer == number) {
            alert('Верно! Это число ' + number + '.');
        }
        if (answer != parseInt(answer)) {
            answer = prompt('Вводить нужно числа.  Какое число я загадал?');
            game(answer, number);
        }
        if (answer < number) {
            answer = prompt('Мало. Попробуй ещё раз!');
            game(answer, number);
        }
        if (answer > number) {
            answer = prompt('Много. Попробуй ещё раз!');
            game(answer, number);
        }
    }
}

let ok = confirm('Угадай число от 1 до 100');

if (ok) {
    let number = random(100);
    let answer = prompt('Какое число я загадал?');
    answer.trim();
    game(answer, number);
}
