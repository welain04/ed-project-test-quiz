// Данные вопросов и вариантов ответов
// Каждый вариант имеет "score" от 1 до 4, который влияет на сегмент
const questions = [
  {
    text: "Как вы обычно распоряжаетесь деньгами после получения дохода?",
    options: [
      { text: "Трачу почти всё, не слежу за расходами", score: 1 },
      { text: "Иногда записываю траты, но без системы", score: 2 },
      { text: "Сначала откладываю небольшую часть, остальное трачу", score: 3 },
      { text: "Есть бюджет, план и фиксированный процент на сбережения", score: 4 },
    ],
  },
  {
    text: "Есть ли у вас финансовая “подушка безопасности” (запас денег на 3–6 месяцев жизни)?",
    options: [
      { text: "Нет совсем, живу “от зарплаты до зарплаты”", score: 1 },
      { text: "Есть небольшие накопления, на 1–2 месяца", score: 2 },
      { text: "Да, примерно на 3–6 месяцев", score: 3 },
      { text: "Есть подушка и дополнительные свободные накопления", score: 4 },
    ],
  },
  {
    text: "Как вы относитесь к инвестициям?",
    options: [
      { text: "Почти ничего не знаю, боюсь потерять деньги", score: 1 },
      { text: "Читал(а) об этом, но пока не инвестирую", score: 2 },
      { text: "Пробовал(а) простые инструменты (накопительный счёт, облигации)", score: 3 },
      { text: "Активно инвестирую и разбираюсь в разных инструментах", score: 4 },
    ],
  },
  {
    text: "Что вы хотите улучшить в своей финансовой ситуации в ближайший год?",
    options: [
      { text: "Вообще навести порядок в деньгах и долгах", score: 1 },
      { text: "Научиться стабильно откладывать хотя бы небольшую сумму", score: 2 },
      { text: "Увеличить размер накоплений и понять, как их инвестировать", score: 3 },
      { text: "Повысить доходность существующего капитала и диверсифицировать вложения", score: 4 },
    ],
  },
];

// Описание 4 сегментов и продуктов под каждый сегмент
const segments = [
  {
    level: 1,
    title: "Новичок в финансах",
    // Короткое одно предложение о результате теста для этого уровня
    description:
      "Сейчас у вас ещё нет устойчивой дельты и финансовой системы, но вы на старте пути к порядку в деньгах.",
    productTitle: "Стартовый онлайн-курс «Финансовая база с нуля»",
    // Тезисно: какие результаты даст продукт
    productDescription:
      "После прохождения вы начнёте считать доходы и расходы, увидите, куда “утекают” деньги, и заложите основу первой финансовой подушки.",
  },
  {
    level: 2,
    title: "Финансовый базовый уровень",
    description:
      "У вас есть базовое понимание финансов, но ещё не выстроена привычка регулярно откладывать и накапливать дельту.",
    productTitle: "Практикум «Личный бюджет и первая дельта»",
    productDescription:
      "После практикума у вас будет простой рабочий бюджет, настроенное автоматическое откладывание и первая стабильная дельта без жёсткой экономии.",
  },
  {
    level: 3,
    title: "Растущий инвестор",
    description:
      "У вас уже есть небольшая дельта и накопления, и вы готовы аккуратно переходить от простого сбережения к осознанным инвестициям.",
    productTitle: "Курс «Первые инвестиции: от дельты к капиталу»",
    productDescription:
      "После курса вы поймёте базовые инвестиционные инструменты, соберёте свой первый портфель и сможете направлять дельту не на спонтанные траты, а на рост капитала.",
  },
  {
    level: 4,
    title: "Осознанный инвестор с капиталом",
    description:
      "У вас уже есть капитал и понимание финансов, и сейчас важная задача — структурировать вложения под долгосрочные цели.",
    productTitle: "Персональная стратегия «Капитал под цели»",
    productDescription:
      "После работы над стратегией у вас будет чёткий план распределения капитала, понятная структура портфеля и правила, как поддерживать и пересматривать вложения под ваши цели.",
  },
];

// Поиск элементов на странице
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const contactScreen = document.getElementById("contact-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionError = document.getElementById("question-error");

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const buyBtn = document.getElementById("buy-btn");
const restartBtn = document.getElementById("restart-btn");

// Текущие ответы пользователя
let currentQuestionIndex = 0;
let answers = []; // сюда будем записывать числовые score по каждому вопросу

// Переход к экрану с вопросами
startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  answers = [];
  showQuestion();
});

// Обработка кнопки "Дальше"
nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  // Если пользователь не выбрал ответ — показываем понятную ошибку
  if (!selectedOption) {
    questionError.textContent = "Пожалуйста, выберите один из вариантов ответа.";
    return;
  }

  questionError.textContent = "";
  const score = Number(selectedOption.value);
  answers[currentQuestionIndex] = score;

  // Если это последний вопрос — переходим к форме
  if (currentQuestionIndex === questions.length - 1) {
    quizScreen.classList.add("hidden");
    contactScreen.classList.remove("hidden");
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
});

// Показ текущего вопроса на экране
function showQuestion() {
  const question = questions[currentQuestionIndex];
  progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
  questionText.textContent = question.text;

  // Очищаем предыдущие варианты
  optionsContainer.innerHTML = "";

  // Создаём радио-кнопки с вариантами ответов
  question.options.forEach((option, index) => {
    const optionId = `option-${currentQuestionIndex}-${index}`;

    const label = document.createElement("label");
    label.className = "option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option.score;
    input.id = optionId;

    const span = document.createElement("span");
    span.className = "option-text";
    span.textContent = option.text;

    label.appendChild(input);
    label.appendChild(span);
    optionsContainer.appendChild(label);
  });

  questionError.textContent = "";
}

// Валидация формы контактов
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let hasError = false;

  // Очищаем прошлые ошибки
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  // Проверка имени
  if (!nameInput.value.trim()) {
    nameError.textContent = "Введите ваше имя.";
    hasError = true;
  }

  // Простая проверка email
  if (!emailInput.value.trim()) {
    emailError.textContent = "Введите ваш email.";
    hasError = true;
  } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
    emailError.textContent = "Проверьте правильность email.";
    hasError = true;
  }

  // Простая проверка телефона
  const phoneValue = phoneInput.value.trim();
  if (!phoneValue) {
    phoneError.textContent = "Введите номер телефона.";
    hasError = true;
  } else if (phoneValue.replace(/\D/g, "").length < 10) {
    phoneError.textContent = "Пожалуйста, введите корректный номер телефона.";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Если всё хорошо — считаем результат и показываем экран с результатом
  const segment = calculateSegment();
  const userName = nameInput.value.trim();

  // Текст результата с обращением по имени
  resultTitle.textContent = `${userName}, ваш уровень — «${segment.title}»`;
  resultDescription.textContent = segment.description;
  productTitle.textContent = segment.productTitle;
  productDescription.textContent = segment.productDescription;

  contactScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
});

// Расчёт сегмента на основе среднего значения score
function calculateSegment() {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / questions.length;

  // Округляем до ближайшего целого от 1 до 4
  let level = Math.round(averageScore);
  if (level < 1) level = 1;
  if (level > 4) level = 4;

  return segments.find((segment) => segment.level === level);
}

// Обработка клика по кнопке "Купить продукт"
buyBtn.addEventListener("click", () => {
  alert("Спасибо за интерес! В учебном проекте покупка — это просто демонстрация. В реальном продукте здесь могла бы быть форма оплаты или заявка.");
});

// Повторное прохождение теста
restartBtn.addEventListener("click", () => {
  // Сбрасываем состояния
  answers = [];
  currentQuestionIndex = 0;
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  // Показываем экран с приветствием
  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
});

