// --- App State Variables ---
let currentMode = 'flashcards';
let currentLanguage = 'es-en'; // Spanish to English by default
let currentIndex = 0;
let showingTranslation = false;
let correctCount = 0;
let quizAnswered = false;
let userName = '';
let isLoadingVocabulary = false;

// --- Utility: Get language config ---
function getLanguageConfig() {
    const configs = {
        'es-en': { source: 'spanish', target: 'english', sourceFlag: '🇪🇸', targetFlag: '🇬🇧' },
        'es-de': { source: 'spanish', target: 'german', sourceFlag: '🇪🇸', targetFlag: '🇩🇪' },
        'en-es': { source: 'english', target: 'spanish', sourceFlag: '🇬🇧', targetFlag: '🇪🇸' },
        'de-es': { source: 'german', target: 'spanish', sourceFlag: '🇩🇪', targetFlag: '🇪🇸' }
    };
    return configs[currentLanguage];
}

// --- Mode switching ---
function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.getElementById('flashcardMode').style.display = (mode === 'flashcards') ? 'flex' : 'none';
    document.getElementById('quizMode').style.display = (mode === 'quiz') ? 'block' : 'none';
    document.getElementById('grammarMode').style.display = (mode === 'grammar') ? 'block' : 'none';

    if (mode === 'flashcards') {
        updateDisplay();
    } else if (mode === 'quiz') {
        generateQuiz();
    } else if (mode === 'grammar') {
        showGrammarLesson();
    }
}

// --- Language switching ---
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    showingTranslation = false;
    updateDisplay();
    if (currentMode === 'quiz') generateQuiz();
}

// --- Login and App Start ---
function startLearning() {
    userName = document.getElementById('nameInput').value.trim();
    if (userName.length === 0) return;
    document.getElementById('appTitle').textContent = `${userName}'s Spanish Class`;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    init();
}

// --- Initialization ---
function init() {
    updateDisplay();
    updateStats();
    updateProgress();
}

// --- Flashcard Display ---
function updateDisplay() {
    const word = vocabulary[currentIndex];
    const config = getLanguageConfig();
    document.getElementById('wordDisplay').textContent = word[config.source];
    if (showingTranslation) {
        document.getElementById('translation').textContent = word[config.target];
    } else {
        document.getElementById('translation').textContent = `Click to reveal ${config.targetFlag} translation`;
    }
}

// --- Flashcard click to reveal ---
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('flashcardMode').addEventListener('click', function() {
        if (currentMode === 'flashcards') {
            showingTranslation = !showingTranslation;
            updateDisplay();
        }
    });
});

// --- Navigation ---
function nextCard() {
    currentIndex = (currentIndex + 1) % vocabulary.length;
    showingTranslation = false;
    updateDisplay();
    updateStats();
    updateProgress();
    if (currentMode === 'quiz') generateQuiz();
}
function previousCard() {
    currentIndex = (currentIndex - 1 + vocabulary.length) % vocabulary.length;
    showingTranslation = false;
    updateDisplay();
    updateStats();
    updateProgress();
    if (currentMode === 'quiz') generateQuiz();
}
function shuffleCards() {
    for (let i = vocabulary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vocabulary[i], vocabulary[j]] = [vocabulary[j], vocabulary[i]];
    }
    currentIndex = 0;
    showingTranslation = false;
    updateDisplay();
    updateStats();
    updateProgress();
    if (currentMode === 'quiz') generateQuiz();
}

// --- Quiz Mode ---
function generateQuiz() {
    const currentWord = vocabulary[currentIndex];
    const config = getLanguageConfig();
    const question = `What does "${currentWord[config.source]}" mean?`;
    document.getElementById('quizQuestion').textContent = question;
    const correctAnswer = currentWord[config.target];
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        const wrongAnswer = randomWord[config.target];
        if (!options.includes(wrongAnswer)) options.push(wrongAnswer);
    }
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    // Display options
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(optionElement, option === correctAnswer);
        optionsContainer.appendChild(optionElement);
    });
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    quizAnswered = false;
}

function selectAnswer(element, isCorrect) {
    if (quizAnswered) return;
    quizAnswered = true;
    document.querySelectorAll('.option').forEach(option => {
        option.style.pointerEvents = 'none';
        if (option === element) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (!isCorrect) {
            const currentWord = vocabulary[currentIndex];
            const config = getLanguageConfig();
            const correctAnswer = currentWord[config.target];
            if (option.textContent === correctAnswer) {
                option.classList.add('correct');
            }
        }
    });
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.textContent = '¡Correcto! Great job!';
        feedback.className = 'feedback correct';
        correctCount++;
    } else {
        feedback.textContent = '¡Incorrecto! Try again next time.';
        feedback.className = 'feedback incorrect';
    }
    updateStats();
    setTimeout(() => {
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'auto';
            option.classList.remove('correct', 'incorrect');
        });
        nextCard();
    }, 2000);
}

// --- Stats and Progress ---
function updateStats() {
    document.getElementById('currentCard').textContent = currentIndex + 1;
    document.getElementById('totalCards').textContent = vocabulary.length;
    document.getElementById('correctAnswers').textContent = correctCount;
}
function updateProgress() {
    const progress = ((currentIndex + 1) / vocabulary.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// --- Name input logic ---
document.addEventListener('DOMContentLoaded', function() {
    // Focus on name input when page loads
    document.getElementById('nameInput').focus();

    // Enable/disable start button
    document.getElementById('nameInput').addEventListener('input', function(e) {
        const name = e.target.value.trim();
        const startButton = document.getElementById('startButton');
        if (name.length > 0) {
            startButton.disabled = false;
            startButton.textContent = `Start Learning, ${name}! 🚀`;
        } else {
            startButton.disabled = true;
            startButton.textContent = 'Start Learning! 🚀';
        }
    });

    // Handle Enter key in name input
    document.getElementById('nameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !document.getElementById('startButton').disabled) {
            startLearning();
        }
    });
});

// --- GRAMMAR NAVIGATION LOGIC ---

function getAvailableLevels() {
    return [...new Set(grammarLessons.map(lesson => lesson.level))];
}
function getAvailableTopics(level) {
    return [...new Set(grammarLessons.filter(l => l.level === level).map(l => l.topic))];
}
function getLessons(level, topic) {
    return grammarLessons.filter(l => l.level === level && l.topic === topic);
}

let selectedLevel = null;
let selectedTopic = null;

function renderLevelSelector() {
    const levels = getAvailableLevels();
    const container = document.getElementById('levelSelector');
    container.innerHTML = levels.map(level =>
        `<button class="btn${selectedLevel === level ? ' active' : ''}" onclick="selectLevel('${level}')">${level}</button>`
    ).join(' ');
    document.getElementById('topicSelector').innerHTML = '';
    document.getElementById('lessonList').innerHTML = '';
    document.getElementById('grammarContent').innerHTML = '';
    selectedTopic = null;
}

function renderTopicSelector() {
   if (!selectedLevel) return;
   const topics = getAvailableTopics(selectedLevel);
   const container = document.getElementById('topicSelector');
   container.innerHTML = topics.map(topic =>
       `<button class="btn${selectedTopic === topic ? ' active' : ''}" onclick="selectTopic('${topic}')">${topic}</button>`
   ).join(' ');
   document.getElementById('lessonList').innerHTML = '';
   document.getElementById('grammarContent').innerHTML = '';
}

function renderLessonList() {
    if (!selectedLevel || !selectedTopic) return;
    const lessons = getLessons(selectedLevel, selectedTopic);
    const container = document.getElementById('lessonList');
    container.innerHTML = lessons.map((lesson, idx) =>
        `<div class="lesson-btn lesson-color-${idx % 10}" onclick="showGrammarLessonByIndex('${selectedLevel}', '${selectedTopic}', ${idx})">${lesson.title}</div>`
    ).join('');
    document.getElementById('grammarContent').innerHTML = '';
}

function showGrammarLessonByIndex(level, topic, idx) {
    const lessons = getLessons(level, topic);
    const lesson = lessons[idx];
    const container = document.getElementById('grammarContent');
    container.innerHTML = `
        <h3>${lesson.title}</h3>
        ${lesson.content}
        <div style="margin-top:20px;">
            ${idx > 0 ? `<button class="btn secondary" onclick="showGrammarLessonByIndex('${level}', '${topic}', ${idx-1})">Previous</button>` : ''}
            ${idx < lessons.length-1 ? `<button class="btn" onclick="showGrammarLessonByIndex('${level}', '${topic}', ${idx+1})">Next</button>` : ''}
        </div>
    `;
}

window.selectLevel = function(level) {
    selectedLevel = level;
    renderLevelSelector();
    renderTopicSelector();
};
window.selectTopic = function(topic) {
    selectedTopic = topic;
    renderTopicSelector();
    renderLessonList();
};

function showGrammarLesson() {
    selectedLevel = null;
    selectedTopic = null;
    renderLevelSelector();
}