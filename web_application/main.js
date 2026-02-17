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

function startMainExperiment() {
    // Mark final training step as completed
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentTrainingStep}"]`).classList.add('completed');

    // Hide training, show experiment
    document.getElementById('training-area').classList.add('hidden');
    document.getElementById('experiment-area').classList.remove('hidden');

    // Show progress bar
    document.querySelector('.progress-wrapper').classList.remove('hidden');

    // Load and start the experiment
    experimentStartTime = new Date();
    loadQuestions();
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
        image_id: "2007_001763",
        // Ensure paths are correct relative to index.html
        original_image: "data/2007_001763/Target_1/original.png",
        heatmap_image: "heatmaps_data/2007_001763/Target_1_LeGrad/omp.png",
        options: [
            "Cat",
            "Dog",
            "None of them"
        ],
        correct_index: 0,
        correct_name: "Cat",
        method: "Attention Check"
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
        clarityScore: null
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
    feedbackMsg.textContent = isCorrect ? 'Correct.' : `Wrong. The answer was ${q.options[q.correct_index]}.`;
    feedbackMsg.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    resultSection.classList.remove('hidden');

    // Show clarity survey
    document.getElementById('clarity-survey').classList.remove('hidden');
}

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
    // We have 5 methods (or 10 if we split OMP).
    // The user requirement said: "show 5 different methods (so, for each method, we have 6 heatmaps...)".
    // My manifest has method names like "CheferCAM" and "CheferCAM OMP".
    // If we want to show stats per "Base Method" (e.g. CheferCAM) and distinguishing OMP vs Normal,
    // we can group by the exact method string in the question object.

    const stats = {};

    userResponses.forEach(resp => {
        const method = resp.method;
        if (!stats[method]) {
            stats[method] = { correct: 0, total: 0, claritySum: 0 };
        }

        stats[method].total++;
        if (resp.isCorrect) stats[method].correct++;
        if (resp.clarityScore !== null) stats[method].claritySum += resp.clarityScore;
    });

    // Generate HTML for stats
    let statsHtml = '<div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">';

    Object.keys(stats).sort().forEach(method => {
        const s = stats[method];
        const acc = s.total > 0 ? (s.correct / s.total) * 100 : 0;
        const avgClarity = s.total > 0 ? (s.claritySum / s.total) : 0;

        statsHtml += `
            <div class="stat-group" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px;">
                <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${method}</h3>
                <div class="stat-row">
                    <div class="stat-card">
                        <span>${Math.round(acc)}%</span>
                        <label>Accuracy</label>
                    </div>
                    <div class="stat-card">
                        <span>${avgClarity.toFixed(1)}</span>
                        <label>Avg Clarity</label>
                    </div>
                </div>
            </div>
        `;
    });

    statsHtml += '</div>';

    // Inject into completion area, replacing the hardcoded structure
    // We need to find a container. The existing HTML has specific IDs like 'legrad-acc'.
    // We will replace the content of '.stats-grid' or append to it.
    // The previous view showed: <div class="stats-grid">...</div>
    // I can stick this new grid into the DOM.

    const container = document.querySelector('#completion-area .stats-grid');
    if (container) {
        container.innerHTML = statsHtml;
        container.style.display = 'grid'; // ensure grid
    } else {
        // specific fallback if structure changed
        const area = document.getElementById('completion-area');
        const newDiv = document.createElement('div');
        newDiv.innerHTML = statsHtml;
        area.insertBefore(newDiv, area.querySelector('button'));
    }

    // Log complete session data
    console.log('=== SESSION COMPLETE ===');
    console.log('Demographics:', demographics);
    console.log('Statistics:', stats);
    console.log('All Responses:', userResponses);

    // Prepare Stats for Server
    const statsArray = Object.keys(stats).map(method => {
        const s = stats[method];
        return {
            method: method,
            accuracy: s.total > 0 ? (s.correct / s.total) * 100 : 0,
            avgClarity: s.total > 0 ? (s.claritySum / s.total) : 0
        };
    });

    // Calculate Duration and Attention Check
    const experimentEndTime = new Date();
    const durationSeconds = (experimentEndTime - experimentStartTime) / 1000;

    // Check if attention check was passed
    // We look for the question with id "attention_check"
    // Note: userResponses is an array indexed by question index, so we can't search by ID easily unless we scan it
    // But since we inserted it at index 15, it should be at index 15. 
    // Safer to search by questionId though.
    const attentionCheckResponse = Object.values(userResponses).find(r => r.questionId === 'attention_check');
    const attentionCheckPassed = attentionCheckResponse ? attentionCheckResponse.isCorrect : false;

    // Submit to Server (Firebase or Local)
    const submissionData = {
        // demographics: demographics, // Already saved
        responses: userResponses,
        stats: statsArray,
        durationSeconds: durationSeconds,
        attentionCheckPassed: attentionCheckPassed,
        endTime: firebase.firestore.FieldValue.serverTimestamp(),
        status: "completed"
    };

    if (db) {
        // Use Firebase
        let promise;
        if (currentDocId) {
            // Update existing document
            promise = db.collection("experiments").doc(currentDocId).update(submissionData);
        } else {
            // Fallback: Create new if ID missing for some reason
            submissionData.demographics = demographics; // Ensure demographics are included if new
            submissionData.startTime = experimentStartTime;
            promise = db.collection("experiments").add(submissionData);
        }

        promise
            .then(() => {
                console.log("Document updated/written successfully");
                const completionMsg = document.createElement('p');
                completionMsg.textContent = "✓ Results saved to cloud (Firebase).";
                completionMsg.style.color = "var(--success)";
                completionMsg.style.textAlign = "center";
                completionMsg.style.marginTop = "1rem";
                document.getElementById('completion-area').appendChild(completionMsg);
            })
            .catch((error) => {
                console.error("Error updating/adding document: ", error);
                const completionMsg = document.createElement('p'); // fixed var name from errorMsg to match above for consistency roughly
                completionMsg.textContent = "⚠ Error saving to cloud: " + error.message;
                completionMsg.style.color = "var(--error)";
                completionMsg.style.textAlign = "center";
                completionMsg.style.marginTop = "1rem";
                document.getElementById('completion-area').appendChild(completionMsg);
            });
    } else {
        // Fallback to Local API (if running server.py)
        // Ensure demographics are included for local save as it's one-shot
        submissionData.demographics = demographics;

        fetch('/api/submit_results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data saved successfully, User ID:', data.user_id);
                const completionMsg = document.createElement('p');
                completionMsg.textContent = "✓ Results saved to local database.";
                completionMsg.style.color = "var(--success)";
                completionMsg.style.textAlign = "center";
                completionMsg.style.marginTop = "1rem";
                document.getElementById('completion-area').appendChild(completionMsg);
            })
            .catch(error => {
                console.error('Error saving data:', error);
                const errorMsg = document.createElement('p');
                errorMsg.textContent = "⚠ Notice: Could not save data. (Firebase config missing AND Local Server offline)";
                errorMsg.style.color = "var(--text-secondary)";
                errorMsg.style.fontSize = "0.9rem";
                errorMsg.style.textAlign = "center";
                errorMsg.style.marginTop = "1rem";
                document.getElementById('completion-area').appendChild(errorMsg);
            });
    }
}

// NOTE: loadQuestions() is now called from startMainExperiment() after training completion
