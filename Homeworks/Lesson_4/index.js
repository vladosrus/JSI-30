// Проверяем себя, если не понимаем почему так а не иначе пишем в чат или в ЛС, желательно объяснять почему то или иное решение

// Типы данных

console.log([1, 2, 3] + " is the answer."); // "1,2,3 is the answer." потому что при прибавлении строки всё приводится к строке
console.log(false || true * 2); // 2 потому что оператор || приведёт к Boolean и вернёт true, а арифметические оператор * приведёт true к 1 и умножит на 2
console.log({ valueOf: () => 42 } * 2); // 84
console.log(parseInt("7.5") + parseFloat("2.5")); // 9.5 потому что parseInt возвращает только целые числа
console.log(!!"Hello" - 1); // 0 (строка приведётся к булевому true из-за !!, а потом true станет 1 из-за "-")
console.log(new String("hello") instanceof Object); // true
console.log((true ^ false) === (false ^ true)); // true потому что ^(Исключающее ИЛИ) равно 1 только если кто-то один из пары равен 1
console.log(true && "5" + 5); // "55" потому что по приоритету операторов сначала делается сложение
console.log({ valueOf: () => "10", toString: () => "20" } + 5); // 105
console.log((5).toString() === "5"); // true
console.log(null || false || undefined); // undefined
console.log(0 || 2 || NaN); // 2
console.log(1 && null && 2); // null

//

function xy() {}

console.log(typeof xy); // 'function'
console.log(xy instanceof Object); // true, потому что по своей сути функция является объектом

var str1 = String(123);
var str2 = new String(123);

console.log(typeof str1 === typeof str2); // false, т.к str2 - массив вида [String: "123"]
console.log(str1 === str2); // false, т.к str2 - массив вида [String: "123"]
console.log(str1 === String(123)); //true
console.log(str2 === new String(123)); // false, потому что массив будет похожим, но ссылка будет другая
console.log(str1 === 123); // false, т.к строка не равна числу
console.log(str1 === "123"); //true, т.к две одинаковых строки
console.log(str1 == str2); // true, т.к обе переменных приведуться к числу 123
console.log(str1 == 123); // true, т.к str1 приведётся к числу
console.log(str1 == "123"); // true, т.к строка приведётся к числу

var arr = [];
console.log(typeof arr); // "object"

var str3 = "123";
str3[0] = "2";
console.log(str3); // 123

var p = 1 + 2 + 3 + "";
var z = "" + 1 + 2 + 3;

console.log(p, typeof p); // "6" "string"
console.log(z, typeof z); // "123" "string"

var o = "123x";
console.log(Number(o)); // NaN
console.log(parseInt(o, 10)); // 123 т.к будет преобразовывать пока не упрётся в знак, которого нет в указанной системе счисления
// если бы "х" стоял в начале строки, то был бы NaN
console.log(+o); // NaN потому что эта запись тоже самое что Number(o)
console.log(typeof +o); // "number" потому что NaN (Not a Number) относится к числовому формату данных
console.log(Boolean(String(false))); // true т.к сначала false станет строкой "false", а т.к строка не пустая то вернётся true

var h = [];
console.log(h ? 1 : 2); // 1 потому что это упрощённая запись if else, а в операторе if происходит трансформация в Boolean

// Переменные

let a = a + 1;
console.log(a); // ReferenceError, потому что нельзя использовать let переменную до её создания

//

var b = b + 1;
console.log(b); // NaN, потому что undefined + 1 дадут NaN

//

function foo(c) {
  if (c > 0) {
    var c = c + 10;
    return c;
  }
  return c;
}
console.log(foo(15)); // 25

//

function foo() {
  console.log(d2);
  let d1 = "1";
  return function () {
    console.log(d1);
    console.log(d2);
  };
}

const d2 = "2";
const x = foo();

x(); // 2 1 2

//

function giveMeX(showX) {
  if (showX) {
    let x = 5;
  }
  return x;
}

console.log(giveMeX(false)); // err
console.log(giveMeX(true)); // err, потому что даже если let создастся, область видимости у неё будет в пределах блока if

//

console.log(x); // наверное это не отсюда, потому что тут просто ошибка, тк х не объявлен

var y = 1;

console.log(y); // 1

function car() {
  if (false) {
    var y = 2;
  }
  console.log(y);
}

car(); // undefined
console.log(y); // 1

//

var i = 1;
var j = {};

(function () {
  i++;
  j.j = 1;
})();
console.log(i, j); // 2 {j:1} здесь переменные обновляются потому что беруться извне функции

(function (i, j) {
  i++;
  j.k = 1;
})(i, j);
console.log(i, j); // 2 {j:1, k:1} а тут обновляется внешняя переменная только потому что это ссылка на объект, а не ссылочные данные просто преобразуются и остаются внутри функции

//

// Бонус

// Создать объект всеми возможными способами

const obj1 = {};
const obj2 = Object.create(null);
const obj3 = Object.create({});
const obj4 = Object.create(obj1);
const obj5 = new Object();
const obj6 = Object.assign({});

console.log(obj1, obj2, obj3, obj4, obj5, obj6);

//

// Написать функцию глубокого сравнения двух объектов:
// объекты могут быть любыми, и иметь любой уровень вложенности

const deepEqual = (firstObj, secondObj) => {
    
    //Проверяем объект ли
    function isObject(obj) {
      return (
        obj != null && Object.prototype.toString.call(obj) === "[object Object]"
      );
    }

    //Если объекты имеют одну ссылку, то сразу они равны
    if (firstObj === secondObj) return true;

    //Если у объектов различается длина, то сразу они не равны
    if (Object.keys(firstObj).length !== Object.keys(secondObj).length)
      return false;

    // Проходим по ключам первого объекта
    for (let key of Object.keys(firstObj)) {
        //Если оба значения по одному ключу - объекты, то запускаем функцию заново
      if (isObject(firstObj[key]) && isObject(secondObj[key])) {
        //если функция вернула false, то прекращаем функцию
        if (!deepEqual(firstObj[key], secondObj[key])) return false;
      } else {
        if (!secondObj.hasOwnProperty(key)) {
          return false;
        }
      }
    }
  
    return true;
  };

const firstObj = { here: { is: "on", other: "3" }, object: "any" };
const secondObj = { here: { is: "on", other: "2" }, object: "any" };

console.log(deepEqual(firstObj, secondObj)); // true;
