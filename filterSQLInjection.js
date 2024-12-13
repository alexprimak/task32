//Функція яка буде фільтрувати інформаціб від небезпечних патернів
function filterDangerousPatterns(data) {
  // попросив в gpt найнебезпечніші патерни
  const dangerousPatterns = [
    /['";--]/g,
    /xp_/,
    /UNION/,
    /SELECT/,
    /INSERT/,
    /DELETE/,
    /UPDATE/,
    /DROP/,
  ];

  // Зберігаємо вхідні дані функції в sanitizedData
  let sanitizedData = data;

  // проходимося по sanitizedData
  dangerousPatterns.forEach((pattern) => {
    //якщо зустрічається один з небезпечних патернів, ми його прибираємо і заміняємо на пусту строку
    sanitizedData = sanitizedData.replace(pattern, "");
  });

  return sanitizedData;
}

function detectSQLInjection(data) {
  // Перевіряємо, якщо віхдні дані не дорівнюють даним, які ми отримали після визову filterDangerousPatterns - значить в наших даних є потенційні SQL-ін'єкції
  const sanitizedData = filterDangerousPatterns(data);
  if (data !== sanitizedData) {
    console.warn("Виявлені потенційні SQL-ін'єкції.");
  } else {
    //а якщо вхідні дані такі які були і на вході, то все чудово
    console.log("Немає SQL-ін'єкції.Дані безпечні!");
  }
}

// Використання
const userInput = prompt("Введіть дані: ");
detectSQLInjection(userInput);

