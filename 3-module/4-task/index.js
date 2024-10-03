function showSalary(obj, age) {
  let result = obj.map(item => {if (item.age <= age) {return `${item.name}, ${item.balance}`}});
  result = result.filter(function(x) {
      return x !== undefined && x !== null;
  });
  let resNew = result.join('\n');
  return resNew;
}

// Пример использования:
let user1 = {
  "balance": "$1,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 21,
  "name": "Golden Branch",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let user2 = {
  "balance": "$1,490.15",
  "picture": "https://placehold.it/32x32",
  "age": 25,
  "name": "Duncan Randall",
  "gender": "male",
  "greeting": "Hello, Duncan Randall! You have 3 unread messages.",
  "favouriteFruit": "apple"
};

let user3 = {
  "balance": "$2,000.00",
  "picture": "https://placehold.it/32x32",
  "age": 19,
  "name": "Alice Smith",
  "gender": "female",
  "greeting": "Hello, Alice Smith! You have 5 unread messages.",
  "favouriteFruit": "pear"
};

// Массив пользователей
let users = [user1, user2, user3];

// Пример вызова функции
let result = showSalary(users, 22);
console.log(result); 
// Вывод:
// Golden Branch, $1,825.65
// Alice Smith, $2,000.00