let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];

const TOTAL_QUESTIONS_LIMIT = 20;

function loadQuestions() {
    const pool = [...QUESTIONS_DATA];

    const t1_pool = pool.filter(q => q.target_type === 'Target_1');
    const t2_pool = pool.filter(q => q.target_type === 'Target_2');
    const tf_pool = pool.filter(q => q.target_type === 'Target_fake');

    shuffleArray(t1_pool);
    shuffleArray(t2_pool);
    shuffleArray(tf_pool);

    // Pick 7, 7, 6
    const selected = [
        ...t1_pool.slice(0, 7),
        ...t2_pool.slice(0, 7),
        ...tf_pool.slice(0, 6)
    ];

    shuffleArray(selected); // Shuffle the final set of 20
    questions = selected;

    initExperiment();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initExperiment() {
    document.getElementById('total-q').textContent = questions.length;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('progress-bar').style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    document.getElementById('original-img').src = q.original_image;
    document.getElementById('heatmap-img').src = q.heatmap_image;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('feedback-area').classList.add('hidden');
    document.getElementById('options-container').classList.remove('hidden');
    // Clear trust btn selection
    document.querySelectorAll('.trust-btn').forEach(b => b.classList.remove('selected'));
}

function handleAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.correct_index;
    if (isCorrect) score++;

    // UI Feedback
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct_index) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    const feedbackArea = document.getElementById('feedback-area');
    const feedbackMsg = document.getElementById('feedback-message');
    feedbackMsg.textContent = isCorrect ? 'Correct! Well done.' : `Incorrect. The target class was ${q.options[q.correct_index]}.`;
    feedbackMsg.style.color = isCorrect ? 'var(--success)' : 'var(--error)';

    feedbackArea.classList.remove('hidden');

    // Initialize results for this question
    userResponses[currentQuestionIndex] = {
        questionId: q.id,
        method: q.method,
        answer: selectedIndex,
        isCorrect: isCorrect,
        trustScore: null
    };
}

// Trust Score Handling
document.querySelectorAll('.trust-btn').forEach(btn => {
    btn.onclick = (e) => {
        const val = parseInt(e.target.dataset.value);
        userResponses[currentQuestionIndex].trustScore = val;

        // Highlight selection
        document.querySelectorAll('.trust-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
    };
});

document.getElementById('next-btn').onclick = () => {
    if (userResponses[currentQuestionIndex].trustScore === null) {
        alert('Please select a trust score to continue.');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showCompletion();
    }
};

function showCompletion() {
    document.getElementById('experiment-area').classList.add('hidden');
    document.getElementById('completion-area').classList.remove('hidden');

    // Calculate Stats
    const stats = {
        'LeGrad': { correct: 0, total: 0, trustSum: 0 },
        'LeGrad OMP': { correct: 0, total: 0, trustSum: 0 }
    };

    userResponses.forEach(resp => {
        const s = stats[resp.method];
        s.total++;
        if (resp.isCorrect) s.correct++;
        s.trustSum += resp.trustScore;
    });

    const legradAcc = stats['LeGrad'].total > 0 ? (stats['LeGrad'].correct / stats['LeGrad'].total) * 100 : 0;
    const legradAvgTrust = stats['LeGrad'].total > 0 ? (stats['LeGrad'].trustSum / stats['LeGrad'].total) : 0;

    const ompAcc = stats['LeGrad OMP'].total > 0 ? (stats['LeGrad OMP'].correct / stats['LeGrad OMP'].total) * 100 : 0;
    const ompAvgTrust = stats['LeGrad OMP'].total > 0 ? (stats['LeGrad OMP'].trustSum / stats['LeGrad OMP'].total) : 0;

    document.getElementById('legrad-acc').textContent = `${Math.round(legradAcc)}%`;
    document.getElementById('legrad-trust').textContent = legradAvgTrust.toFixed(1);

    document.getElementById('omp-acc').textContent = `${Math.round(ompAcc)}%`;
    document.getElementById('omp-trust').textContent = ompAvgTrust.toFixed(1);

    console.log('Final Stats:', stats);
}

loadQuestions();
