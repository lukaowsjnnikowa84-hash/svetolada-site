function sumDigits(num) {
  return num
    .toString()
    .split("")
    .reduce((a, b) => a + Number(b), 0);
}

function reduceNumber(num) {
  if (num <= 0 || isNaN(num)) return 0;
  while (num > 22) num = sumDigits(num);
  return num;
}

function calcLifePath(day, month, year) {
  return reduceNumber(sumDigits(day) + sumDigits(month) + sumDigits(year));
}

function calcSoulNumber(name) {
  const vowels = "аеёиоуыэюяaeiou";
  let sum = 0;
  for (let ch of name.toLowerCase()) {
    if (vowels.includes(ch)) sum += ch.charCodeAt(0);
  }
  return reduceNumber(sum);
}

function calcPersonalityNumber(name) {
  const vowels = "аеёиоуыэюяaeiou";
  let sum = 0;
  for (let ch of name.toLowerCase()) {
    if (!vowels.includes(ch) && /[a-zа-я]/.test(ch)) {
      sum += ch.charCodeAt(0);
    }
  }
  return reduceNumber(sum);
}

function calcDestinyNumber(name) {
  let sum = 0;
  for (let ch of name.toLowerCase()) {
    if (/[a-zа-я]/.test(ch)) sum += ch.charCodeAt(0);
  }
  return reduceNumber(sum);
}

function calcBirthDay(day) {
  return reduceNumber(day);
}

function calcMaturity(lifePath, destiny) {
  return reduceNumber(lifePath + destiny);
}

function calcMonthEnergy(month) {
  return reduceNumber(month);
}

function calcYearEnergy(year) {
  return reduceNumber(year);
}

function calcKarma(lifePath, soul) {
  return reduceNumber(lifePath + soul);
}

function calcTalent(destiny, personality) {
  return reduceNumber(destiny + personality);
}

function calcMission(lifePath, destiny) {
  return reduceNumber(lifePath + destiny);
}

function calcShadow(soul, personality) {
  return reduceNumber(soul + personality);
}

function calcGift(birthDay, soul) {
  return reduceNumber(birthDay + soul);
}

function calculateData(name, birthDate) {
  const [d, m, y] = birthDate.split(".").map(Number);

  if (isNaN(d) || isNaN(m) || isNaN(y)) {
    throw new Error("Дата введена неверно");
  }

  const life_path = calcLifePath(d, m, y);
  const soul = calcSoulNumber(name);
  const personality = calcPersonalityNumber(name);
  const destiny = calcDestinyNumber(name);
  const birth_day = calcBirthDay(d);
  const maturity = calcMaturity(life_path, destiny);
  const month_energy = calcMonthEnergy(m);
  const year_energy = calcYearEnergy(y);
  const karma = calcKarma(life_path, soul);
  const talent = calcTalent(destiny, personality);
  const mission = calcMission(life_path, destiny);
  const shadow = calcShadow(soul, personality);
  const gift = calcGift(birth_day, soul);

  return {
    life_path,
    soul,
    personality,
    destiny,
    birth_day,
    maturity,
    name_vibration: soul,
    full_name_number: destiny,
    birth_code: birthDate,
    year_energy,
    month_energy,
    karma,
    talent,
    mission,
    shadow,
    gift,
  };
}

function personalize(template, data) {
  return template.replace(/\$\{(.*?)\}/g, (_, key) => data[key] ?? "");
}

function generateReport() {
  const name = document.getElementById("name").value.trim();
  const birthDate = document.getElementById("birth_date").value.trim();

  if (!name) {
    alert("Введите имя");
    return;
  }

  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) {
    alert("Введите дату в формате дд.мм.гггг");
    return;
  }

  let data;
  try {
    data = calculateData(name, birthDate);
  } catch (e) {
    alert(e.message);
    return;
  }

  let result = "";

  result += "Введение\n\n";
  result += personalize(svetoladaTexts.introduction, data) + "\n\n";

  const sections = svetoladaTexts.sections;
  for (const key of Object.keys(sections)) {
    result += personalize(sections[key], data) + "\n\n";
  }

  result += personalize(svetoladaTexts.conclusion, data);

  document.getElementById("output").textContent = result;
}
