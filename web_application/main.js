let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];
let currentTrainingStep = 1;

// Demographics data storage
let demographics = {};

const TOTAL_QUESTIONS_LIMIT = 20;

// ==================
// DEMOGRAPHICS PHASE
// ==================

document.getElementById('demographics-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect demographics data (AI familiarity removed)
    demographics = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        education: document.getElementById('education').value,
        country: document.getElementById('country').value
    };

    console.log('Demographics collected:', demographics);

    // Transition to training phase
    document.getElementById('demographics-area').classList.add('hidden');
    document.getElementById('training-area').classList.remove('hidden');
});

// ==================
// TRAINING PHASE
// ==================

function nextTrainingStep() {
    // Mark current step as completed
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.add('completed');

    // Hide current step
    document.getElementById(`training-step-${currentTrainingStep}`).classList.add('hidden');

    // Move to next step
    currentTrainingStep++;

    // Show next step and mark as active
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.add('active');
    document.getElementById(`training-step-${currentTrainingStep}`).classList.remove('hidden');
}

function checkPractice(btn) {
    const isCorrect = btn.dataset.correct === 'true';
    const feedbackEl = document.getElementById('practice-feedback');
    const resultEl = feedbackEl.querySelector('.practice-result');

    // Disable all practice buttons
    document.querySelectorAll('.practice-opt').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') {
            b.classList.add('correct');
        } else if (b === btn && !isCorrect) {
            b.classList.add('wrong');
        }
    });

    // Show feedback
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
        feedbackEl.classList.add('correct');
        resultEl.textContent = '✓ Correct! The heatmap shows the model focusing on the dog.';
        resultEl.style.color = 'var(--success)';
    } else {
        feedbackEl.classList.add('incorrect');
        resultEl.textContent = '✗ Not quite. Look at where the red/yellow colors are concentrated — that\'s the dog!';
        resultEl.style.color = 'var(--error)';
    }

    // Show the start experiment button
    document.getElementById('start-experiment-btn').classList.remove('hidden');
}

function startMainExperiment() {
    // Mark final training step as completed
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.add('completed');

    // Hide training, show experiment
    document.getElementById('training-area').classList.add('hidden');
    document.getElementById('experiment-area').classList.remove('hidden');

    // Load and start the experiment
    loadQuestions();
}

// ==================
// EXPERIMENT PHASE
// ==================

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

    shuffleArray(selected);
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

    // Reset state for new question
    currentSelection = null;

    // Reset UI
    document.getElementById('feedback-area').classList.add('hidden');
    document.getElementById('options-container').classList.remove('hidden');
    document.getElementById('confirm-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('clarity-survey').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    // Clear clarity selection
    document.querySelectorAll('.clarity-option').forEach(opt => opt.classList.remove('selected'));

    // Re-enable all option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong', 'selected');
    });
}

// Track current selection
let currentSelection = null;

function handleAnswer(selectedIndex) {
    currentSelection = selectedIndex;

    // Highlight selected answer (no correct/wrong yet)
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === selectedIndex) {
            btn.classList.add('selected');
        }
    });

    // Show feedback area with "Last choice?" prompt
    document.getElementById('feedback-area').classList.remove('hidden');
    document.getElementById('confirm-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
}

// Change button - allow re-selection
document.getElementById('change-btn').onclick = () => {
    // Just hide the feedback area, user can click another option
    document.getElementById('feedback-area').classList.add('hidden');

    // Remove selection highlight
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    currentSelection = null;
};

// Confirm button - reveal result
document.getElementById('confirm-btn').onclick = () => {
    if (currentSelection === null) {
        alert('Please select an answer first.');
        return;
    }

    const q = questions[currentQuestionIndex];
    const isCorrect = currentSelection === q.correct_index;

    // Record response
    userResponses[currentQuestionIndex] = {
        questionId: q.id,
        method: q.method,
        answer: currentSelection,
        isCorrect: isCorrect,
        clarityScore: null
    };

    if (isCorrect) score++;

    // Hide confirm section
    document.getElementById('confirm-section').classList.add('hidden');

    // Disable all buttons and show correct/wrong
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((btn, index) => {
        btn.disabled = true;
        btn.classList.remove('selected');
        if (index === q.correct_index) {
            btn.classList.add('correct');
        } else if (index === currentSelection && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // Show result message
    const resultSection = document.getElementById('result-section');
    const feedbackMsg = document.getElementById('feedback-message');
    feedbackMsg.textContent = isCorrect ? 'Correct.' : `Wrong. The answer was ${q.options[q.correct_index]}.`;
    feedbackMsg.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    resultSection.classList.remove('hidden');

    // Show clarity survey
    document.getElementById('clarity-survey').classList.remove('hidden');
};

// Clarity Rating Handling
document.querySelectorAll('.clarity-option').forEach(opt => {
    opt.onclick = () => {
        const val = parseInt(opt.dataset.value);
        userResponses[currentQuestionIndex].clarityScore = val;

        // Highlight selection
        document.querySelectorAll('.clarity-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        // Show next button
        document.getElementById('next-btn').classList.remove('hidden');
    };
});

document.getElementById('next-btn').onclick = () => {
    if (userResponses[currentQuestionIndex].clarityScore === null) {
        alert('Please rate the clarity of the heatmap to continue.');
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
        'LeGrad': { correct: 0, total: 0, claritySum: 0 },
        'LeGrad OMP': { correct: 0, total: 0, claritySum: 0 }
    };

    userResponses.forEach(resp => {
        const s = stats[resp.method];
        s.total++;
        if (resp.isCorrect) s.correct++;
        s.claritySum += resp.clarityScore;
    });

    const legradAcc = stats['LeGrad'].total > 0 ? (stats['LeGrad'].correct / stats['LeGrad'].total) * 100 : 0;
    const legradAvgClarity = stats['LeGrad'].total > 0 ? (stats['LeGrad'].claritySum / stats['LeGrad'].total) : 0;

    const ompAcc = stats['LeGrad OMP'].total > 0 ? (stats['LeGrad OMP'].correct / stats['LeGrad OMP'].total) * 100 : 0;
    const ompAvgClarity = stats['LeGrad OMP'].total > 0 ? (stats['LeGrad OMP'].claritySum / stats['LeGrad OMP'].total) : 0;

    document.getElementById('legrad-acc').textContent = `${Math.round(legradAcc)}%`;
    document.getElementById('legrad-trust').textContent = legradAvgClarity.toFixed(1);

    document.getElementById('omp-acc').textContent = `${Math.round(ompAcc)}%`;
    document.getElementById('omp-trust').textContent = ompAvgClarity.toFixed(1);

    // Log complete session data
    console.log('=== SESSION COMPLETE ===');
    console.log('Demographics:', demographics);
    console.log('Statistics:', stats);
    console.log('All Responses:', userResponses);
}

// NOTE: loadQuestions() is now called from startMainExperiment() after training completion
