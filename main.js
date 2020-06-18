const books = document.querySelector('.books'),
      book = document.querySelectorAll('.book'),
      adv = document.querySelector('.adv'),
      backgroundImage = document.querySelector('body'),
      a = document.querySelectorAll('a'),
      ul = document.querySelectorAll('ul'),
      li = document.querySelectorAll('li'),
      newLi = document.createElement('li');

books.prepend(book[1]);
book[4].after(book[3]);
books.append(book[2]);

backgroundImage.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

a[4].textContent = 'Книга 3. this и Прототипы Объектов';

li[9].after(li[2]);
li[8].after(li[7]);
li[3].after(li[6]);
li[6].after(li[8]);

li[50].after(li[48]);
li[49].before(li[55]);
li[54].before(li[51]);

newLi.textContent = 'Глава 8: За пределами ES6';
ul[2].append(newLi);
li[26].before(newLi);

adv.remove();