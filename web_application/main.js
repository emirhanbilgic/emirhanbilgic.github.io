let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];
let currentTrainingStep = 1;

// Demographics data storage
let demographics = {};
let experimentStartTime;

const TOTAL_QUESTIONS_LIMIT = 30;

// ==================
// FIREBASE INIT
// ==================
// ==================
// FIREBASE INIT
// ==================
let db;
try {
    if (typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase initialized successfully.");
    } else {
        console.log("Firebase not initialized. Checks: firebase loaded?", typeof firebase !== 'undefined', "config loaded?", typeof firebaseConfig !== 'undefined');
    }
} catch (e) {
    console.error("Firebase init error:", e);
}

// Check for deployment issues
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && !db) {
    setTimeout(() => {
        let msg = "WARNING: You are running on a live site but Firebase is not connected.\n\n";
        if (typeof firebase === 'undefined') msg += "- Firebase SDK not loaded. Check index.html.\n";
        if (typeof firebaseConfig === 'undefined') msg += "- firebase_config.js not loaded or empty.\n";
        msg += "\nData will NOT be saved.";
        alert(msg);
    }, 2000);
}

// ==================
// DEMOGRAPHICS PHASE
// ==================

// Current Firestore Document ID
let currentDocId = null;

// Update slider value display
document.getElementById('ai-expertise').addEventListener('input', function (e) {
    document.getElementById('ai-expertise-val').textContent = e.target.value;
});

document.getElementById('demographics-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect demographics data
    demographics = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        education: document.getElementById('education').value,
        country: document.getElementById('country').value,
        aiExpertise: document.getElementById('ai-expertise').value
    };

    console.log('Demographics collected:', demographics);

    // Save initial session to Firebase
    createExperimentSession();

    // Transition to training phase
    document.getElementById('demographics-area').classList.add('hidden');
    document.getElementById('training-area').classList.remove('hidden');
});

function createExperimentSession() {
    if (!db) return;

    const initialData = {
        demographics: demographics,
        startTime: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent,
        status: "started", // Track incomplete sessions
        responses: [] // Initialize empty
    };

    db.collection("experiments").add(initialData)
        .then((docRef) => {
            currentDocId = docRef.id;
            console.log("Session started with ID: ", currentDocId);
        })
        .catch((error) => {
            console.error("Error creating session: ", error);
        });
}

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
        resultEl.textContent = '✓ Correct. The heatmap shows the model focusing on the dog.';
        resultEl.style.color = 'var(--success)';
    } else {
        feedbackEl.classList.add('incorrect');
        resultEl.textContent = '✗ Not quite. Look at where the red/orange colors are concentrated - that\'s the dog.';
        resultEl.style.color = 'var(--error)';
    }

    // Show the start experiment button
    document.getElementById('start-experiment-btn').classList.remove('hidden');
}


let isReviewingTutorial = false;

function reviewTutorial() {
    isReviewingTutorial = true;

    // Hide experiment, show training
    document.getElementById('experiment-area').classList.add('hidden');
    document.getElementById('training-area').classList.remove('hidden');
    document.querySelector('.progress-wrapper').classList.add('hidden');

    // Reset training UI to Step 1
    resetTrainingUI();
}

function resetTrainingUI() {
    // Reset internal counter
    currentTrainingStep = 1;

    // Reset step indicators
    document.querySelectorAll('.step-indicator .step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index === 0) step.classList.add('active');
    });

    // Reset content visibility
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`training-step-${i}`);
        if (el) el.classList.add('hidden');
    }
    document.getElementById('training-step-1').classList.remove('hidden');

    // Reset Practice buttons
    document.querySelectorAll('.practice-opt').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong');
    });
    document.getElementById('practice-feedback').classList.add('hidden');

    // Update button text to "Resume Experiment"
    const startBtn = document.getElementById('start-experiment-btn');
    startBtn.textContent = "Resume Experiment";
    startBtn.classList.add('hidden');
}

function startMainExperiment() {
    // Mark final training step as completed
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.add('completed');

    // Hide training, show experiment
    document.getElementById('training-area').classList.add('hidden');
    document.getElementById('experiment-area').classList.remove('hidden');

    // Show progress bar
    document.querySelector('.progress-wrapper').classList.remove('hidden');

    if (isReviewingTutorial) {
        // Resuming from review
        isReviewingTutorial = false;
        // Don't reset experiment state
    } else {
        // First time starting
        experimentStartTime = new Date();
        loadQuestions();
    }
}

// ==================
// EXPERIMENT PHASE
// ==================

function loadQuestions() {
    if (typeof MANIFEST !== 'undefined') {
        generateSessionQuestions(MANIFEST);
    } else {
        console.error('MANIFEST not found. Please ensure data.js is loaded.');
        alert('Failed to load experiment data. data.js might be missing.');
    }
}

function generateSessionQuestions(allQuestions) {
    // 1. Group by Method and Heatmap Type
    // We expect 5 methods * 6 heatmap types = 30 groups
    // Methods: CheferCAM, CheferCAM OMP, AttentionCAM, AttentionCAM OMP, ...
    // Types: Target_1 (normal), Target_1 (omp) ... wait, the manifest has "method" field that distinguishes OMP vs Normal
    // Let's look at the structure I generated:
    // method: "CheferCAM" or "CheferCAM OMP"
    // target_type: "Target_1", "Target_2", "Target_fake"
    // heatmap_type: "normal" or "omp" -> actually this is redundant if method name has OMP.
    // Let's group by (Method Name, Target Type).

    // There are 10 distinct method names in manifest: 
    // [CheferCAM, CheferCAM OMP, AttentionCAM, AttentionCAM OMP, DAAM, DAAM OMP, GradCAM, GradCAM OMP, LeGrad, LeGrad OMP]
    // And 3 Target Types: [Target_1, Target_2, Target_fake]
    // Total combinations = 10 * 3 = 30.

    // Correction: User said "each image has 6 heatmaps for each method"
    // "target 1, target 2, fake" AND "target 1 omp, target 2 omp, fake omp"
    // My manifest generator created "Method" and "Method OMP" as separate methods in the JSON 'method' field.
    // So "CheferCAM" (normal) and "CheferCAM OMP" are sufficient to distinguish.

    const groups = {};

    allQuestions.forEach(q => {
        const key = `${q.method}|${q.target_type}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(q);
    });

    // Check if we have all 30 groups
    const groupKeys = Object.keys(groups);
    console.log(`Found ${groupKeys.length} unique question groups.`);

    let selectedQuestions = [];

    // 2. Select one random question from each group
    // To serve "each image leads to the same level of task difficulty", 
    // ideally we should try to not repeat images if possible, or distribute them evenly.
    // There are 50 images. We need 30 questions. We can definitely pick 30 unique images.

    // Let's try to pick 30 unique images first.
    // Get all available image IDs
    const allImageIds = [...new Set(allQuestions.map(q => q.image_id))];
    shuffleArray(allImageIds);

    // We have 30 groups. Assign one image to each group?
    // We might not be able to guarantee that *every* group has *every* image (though they should).
    // Let's assume completeness for now (generated manifest checks for all files).

    // Strategy:
    // Shuffle the groups.
    // For each group, try to pick an image that hasn't been used yet.

    shuffleArray(groupKeys);

    const usedImageIds = new Set();

    groupKeys.forEach(key => {
        const candidates = groups[key];
        shuffleArray(candidates);

        // Try to find a candidate with an unused image
        let chosen = candidates.find(q => !usedImageIds.has(q.image_id));

        // If all candidates for this group have usually been used (unlikely with 50 images and 30 slots),
        // just pick the first one.
        if (!chosen) {
            chosen = candidates[0];
        }

        usedImageIds.add(chosen.image_id);
        selectedQuestions.push(chosen);
    });

    // 3. Shuffle the final selection of 30 questions so they are mixed
    shuffleArray(selectedQuestions);

    questions = selectedQuestions;

    // Insert Attention Check (Question 16, Index 15)
    // Image: 2007_001763 (Cat/Dog)
    // Heatmap: Target_1_LeGrad/omp.png (Attention Check)
    const attentionCheckQuestion = {
        id: "attention_check",
        image_id: "training_example",
        // Ensure paths are correct relative to index.html
        original_image: "training_images/cat_dog.png",
        heatmap_image: "training_images/cat_LeGrad.png",
        options: [
            "Cat",
            "Dog",
            "None of them"
        ],
        correct_index: 0,
        correct_name: "Cat",
        method: "Attention Check",
        target_type: "n/a",
        heatmap_type: "n/a",
        question_text: "Based on the heatmap, which class is the model focusing on?"
    };

    // Insert at index 15 (making it the 16th question)
    if (questions.length >= 15) {
        questions.splice(15, 0, attentionCheckQuestion);
    } else {
        questions.push(attentionCheckQuestion);
    }

    // Update UI Total
    document.getElementById('total-q').textContent = questions.length;

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

    // Update question text if provided, otherwise use default
    const defaultQuestion = "Does the saliency map highlight the correct region, and when the class is not present, does it avoid focusing on any specific object?";
    document.getElementById('question-text').textContent = q.question_text || defaultQuestion;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(btn);
    });

    // Store original button texts for restoration
    originalButtonTexts = [...q.options];

    // Reset state for new question
    currentSelection = null;

    // Reset UI
    document.getElementById('feedback-area').classList.add('hidden');
    document.getElementById('options-container').classList.remove('hidden');
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
let originalButtonTexts = []; // Store original button texts

function handleAnswer(selectedIndex) {
    const btns = document.querySelectorAll('#options-container .option-btn');

    // If clicking the same button that's already selected, confirm the answer
    if (currentSelection === selectedIndex) {
        confirmAnswer();
        return;
    }

    // First click - select and show "Confirm" on the button
    currentSelection = selectedIndex;

    // Reset all buttons to their original text and remove selection
    btns.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (originalButtonTexts[index]) {
            btn.textContent = originalButtonTexts[index];
        }
    });

    // Highlight and change text of selected button
    btns[selectedIndex].classList.add('selected');
    btns[selectedIndex].textContent = 'Confirm';
}

function confirmAnswer() {
    if (currentSelection === null) {
        return;
    }

    const q = questions[currentQuestionIndex];
    const isCorrect = currentSelection === q.correct_index;

    // Record response
    userResponses[currentQuestionIndex] = {
        questionId: q.id,
        imageId: q.image_id,
        method: q.method,
        targetType: q.target_type,
        heatmapType: q.heatmap_type,
        answer: currentSelection,
        isCorrect: isCorrect,
        trustScore: null
    };

    if (isCorrect) score++;

    // Disable all buttons and show correct/wrong on user's selection
    const btns = document.querySelectorAll('#options-container .option-btn');
    btns.forEach((btn, index) => {
        btn.disabled = true;
        // Restore original text
        if (originalButtonTexts[index]) {
            btn.textContent = originalButtonTexts[index];
        }
        btn.classList.remove('selected');
        // Color the user's selection green or red
        if (index === currentSelection) {
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
        }
        // Also show the correct answer if user was wrong
        if (!isCorrect && index === q.correct_index) {
            btn.classList.add('correct');
        }
    });

    // Show feedback area with result
    document.getElementById('feedback-area').classList.remove('hidden');

    // Show result message
    const resultSection = document.getElementById('result-section');
    const feedbackMsg = document.getElementById('feedback-message');
    feedbackMsg.textContent = isCorrect ? 'Correct for this specific XAI technique.' : `For this specific XAI technique, the correct answer was ${q.options[q.correct_index]}.`;
    feedbackMsg.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    resultSection.classList.remove('hidden');

    // Show per-question feedback survey
    document.getElementById('clarity-survey').classList.remove('hidden');
}

// Per-Question Feedback Handling
document.querySelectorAll('.per-q-feedback').forEach(opt => {
    opt.onclick = () => {
        const type = opt.dataset.type; // 'trust'
        const val = parseInt(opt.dataset.value);

        // Safety check
        if (!userResponses[currentQuestionIndex]) {
            console.warn("User response not initialized, initializing now.");
            // Fallback initialization if confirmAnswer somehow didn't do it
            const q = questions[currentQuestionIndex];
            userResponses[currentQuestionIndex] = {
                questionId: q.id,
                imageId: q.image_id,
                method: q.method,
                targetType: q.target_type,
                heatmapType: q.heatmap_type,
                answer: currentSelection || -1, // Fallback
                isCorrect: false, // Fallback
                trustScore: null
            };
        }

        if (type === 'trust') {
            userResponses[currentQuestionIndex].trustScore = val;
            // Highlight inside trust-scale
            document.querySelectorAll('#trust-scale .per-q-feedback').forEach(o => o.classList.remove('selected'));
        }

        opt.classList.add('selected');

        // Check if answered to show next button
        const currentResp = userResponses[currentQuestionIndex];
        if (currentResp && currentResp.trustScore !== null) {
            document.getElementById('next-btn').classList.remove('hidden');
        }
    };
});

document.getElementById('next-btn').onclick = () => {
    const currentResp = userResponses[currentQuestionIndex];
    if (!currentResp || currentResp.trustScore === null) {
        alert('Please answer the feedback question to continue.');
        return;
    }

    // Reset feedback UI for next question
    document.querySelectorAll('.per-q-feedback').forEach(o => o.classList.remove('selected'));

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showCompletion();
    }
};

// Feedback State
let feedbackData = {
    difficulty: null,
    consistency: null
};

function showCompletion() {
    document.getElementById('experiment-area').classList.add('hidden');
    document.getElementById('completion-area').classList.remove('hidden');

    // Initialize feedback option listeners
    document.querySelectorAll('.feedback-opt').forEach(opt => {
        opt.onclick = () => {
            const type = opt.dataset.type;
            const val = parseInt(opt.dataset.value);

            feedbackData[type] = val;

            // Visual selection
            const parent = opt.parentElement;
            parent.querySelectorAll('.feedback-opt').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        };
    });
}

function submitFeedback() {
    if (feedbackData.difficulty === null || feedbackData.consistency === null) {
        alert("Please answer both feedback questions to finish.");
        return;
    }

    // Disable button to prevent double submit
    const btn = document.getElementById('finish-experiment-btn');
    btn.disabled = true;
    btn.textContent = "Saving...";

    // Calculate basic stats for the record (internal use only, not shown to user)
    const stats = {};
    userResponses.forEach(resp => {
        const method = resp.method;
        if (!stats[method]) {
            stats[method] = { correct: 0, total: 0, trustSum: 0 };
        }
        stats[method].total++;
        if (resp.isCorrect) stats[method].correct++;
        if (resp.trustScore !== null) stats[method].trustSum += resp.trustScore;
    });

    const statsArray = Object.keys(stats).map(method => {
        const s = stats[method];
        return {
            method: method,
            accuracy: s.total > 0 ? (s.correct / s.total) * 100 : 0,
            avgTrust: s.total > 0 ? (s.trustSum / s.total) : 0
        };
    });

    // Calculate Duration and Attention Check
    const experimentEndTime = new Date();
    const durationSeconds = (experimentEndTime - experimentStartTime) / 1000;

    const attentionCheckResponse = Object.values(userResponses).find(r => r.questionId === 'attention_check');
    const attentionCheckPassed = attentionCheckResponse ? attentionCheckResponse.isCorrect : false;

    // Submit to Server (Firebase or Local)
    const submissionData = {
        responses: userResponses,
        stats: statsArray, // Saved but not shown
        feedback: feedbackData, // New feedback field
        durationSeconds: durationSeconds,
        attentionCheckPassed: attentionCheckPassed,
        endTime: firebase.firestore.FieldValue.serverTimestamp(),
        status: "completed"
    };

    const sanitizeForFirestore = (obj) => {
        return JSON.parse(JSON.stringify(obj, (k, v) => v === undefined ? null : v));
    };

    const validSubmissionData = sanitizeForFirestore(submissionData);

    const onSaveSuccess = () => {
        console.log("Data saved successfully.");
        document.getElementById('feedback-form-container').classList.add('hidden');
        document.getElementById('final-thank-you').classList.remove('hidden');
    };

    const onSaveError = (error) => {
        console.error("Error saving data:", error);
        alert("Error saving data: " + error.message + ". Please try clicking 'Finish' again.");
        btn.disabled = false;
        btn.textContent = "Finish Experiment";
    };

    if (db) {
        // Use Firebase
        let promise;
        if (currentDocId) {
            promise = db.collection("experiments").doc(currentDocId).update(validSubmissionData);
        } else {
            validSubmissionData.demographics = demographics;
            validSubmissionData.startTime = experimentStartTime;
            promise = db.collection("experiments").add(validSubmissionData);
        }

        promise.then(onSaveSuccess).catch(onSaveError);
    } else {
        // Fallback to Local API
        validSubmissionData.demographics = demographics;
        fetch('/api/submit_results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validSubmissionData)
        })
            .then(response => response.json())
            .then(onSaveSuccess)
            .catch(onSaveError);
    }
}

// NOTE: loadQuestions() is now called from startMainExperiment() after training completion
