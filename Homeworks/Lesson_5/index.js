//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
  console.log(`I output only external context: ${this.item}`);
}
const obj = { item: "some value" };

logger.call(obj); // вызов функции в контексте obj
logger.apply(obj); // вызов функции в контексте obj
logger.bind(obj)(); // можно и так привязать контекст и вызвать функцию, но в таком случае эта привязка никода не сохранится

const newContextLogger = logger.bind(obj); // жёсткая привязка функции к контексту obj
newContextLogger();

//////////////////////////////////

// Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения
// других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.

// Функция createCache должна иметь два метода:

// cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn.
// Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать
// сохраненное значение, не вызывая fn.
// clear(): очищает весь кэш.

function createCache() {
  return {
    myCache: {},

    cache: function (fn) {
      return function (num) {
        if (this.myCache.hasOwnProperty(num)) {
          return `Выполнил: ${this.myCache[num]} (значение взято из кэша)`;
        } else {
          let result = fn(num);
          this.myCache[num] = result;
          return `Выполнил: ${result}`;
        }
      }.bind(this);
    },

    clear: function () {
      Object.keys(this.myCache).forEach((key) => delete this.myCache[key]);
      console.log("Кэш очищен");
    },
  };
}

var myCache = createCache();

function multiplyByTwo(x) {
  return x * 2;
}

var cachedMultiplyByTwo = myCache.cache(multiplyByTwo);

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)

console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)

myCache.clear(); // Вывод : Кэш очищен

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10

//////////////////////////////////////////

// Бонус
// Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

// Код здесь

//
Function.prototype.myBind = function (context, ...rest) {
  // получаем функцию на которой вызван мой метод
  let func = this;

  // возвращаем функцию чтобы можно было предавать аргументы и при использовании метода и при его вызове
  return function (...args) {
    // добавляем в переданный объект контекста уникальное свойство равное функции, на которой вызван метод
    const uniqSimbolId = Symbol("uniqSimbolId");

    context[uniqSimbolId] = func;

    // выполняем функцию в контексте преданного объекта с объединёнными параметрами
    const result = context[uniqSimbolId](...rest.concat(args));

    // удаляем добавленный нами параметр
    delete context[uniqSimbolId];

    // возвращаем результат выполнения функции
    return result;
  };
};

// проверка работы полифила
function anotherLogger(one, two, three) {
  console.log(
    `${this.item}, аргументы самой функции: ${one}, ${two}, ${three}`
  );
  // выдаётся ли результат функции
  return one;
}
const anotherObj = { item: "аргумент из объекта" };

console.log(anotherLogger.myBind(anotherObj, "one", "two")("three"));
console.log(anotherLogger.bind(anotherObj, "one", "two", "three")());
