let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let userResponses = [];
let seenImages = new Set();
let currentMaxQuestions = 20;

// Demographics data storage
let demographics = {};
let experimentStartTime;

const TOTAL_QUESTIONS = 20;
let db;

try {
    if (typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase initialized successfully.");
    }
} catch (e) {
    console.error("Firebase init error:", e);
}

// Current Firestore Document ID
let currentDocId = null;

document.addEventListener('DOMContentLoaded', () => {
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

        createExperimentSession();

        // Transition to training phase
        document.getElementById('demographics-area').classList.add('hidden');
        document.getElementById('training-area').classList.remove('hidden');
    });
});

function createExperimentSession() {
    if (!db) return;

    const initialData = {
        demographics: demographics,
        startTime: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: navigator.userAgent,
        status: "started", 
        responses: [] 
    };

    db.collection("experiments_aistudy").add(initialData)
        .then((docRef) => {
            currentDocId = docRef.id;
        })
        .catch((error) => {
            console.error("Error creating session: ", error);
        });
}

function startMainExperiment() {
    document.getElementById('training-area').classList.add('hidden');
    document.getElementById('experiment-area').classList.remove('hidden');
    document.querySelector('.progress-wrapper').classList.remove('hidden');

    experimentStartTime = new Date();
    loadQuestions();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestions() {
    if (typeof IMAGE_BASENAMES === 'undefined') {
        alert('Data not loaded. Please ensure data.js is generated.');
        return;
    }

    let availableBasenames = IMAGE_BASENAMES.filter(b => !seenImages.has(b));
    let numToPick = Math.min(TOTAL_QUESTIONS, availableBasenames.length);
    if (numToPick === 0) {
        alert("You have judged all available images! Thank you for your immense help!");
        return;
    }
    
    currentMaxQuestions = numToPick;

    // 1. Pick unique random basenames
    shuffleArray(availableBasenames);
    let selectedBasenames = availableBasenames.slice(0, numToPick);
    selectedBasenames.forEach(b => seenImages.add(b));

    // 2. We want roughly equal distribution among: 
    //    'originals', 'inpainting_exchange', 'standard_inpainting'
    let categories = [];
    let thirds = Math.floor(numToPick / 3);
    for (let i=0; i<thirds; i++) categories.push('originals');
    for (let i=0; i<Math.floor((numToPick - thirds) / 2); i++) categories.push('inpainting_exchange');
    while (categories.length < numToPick) {
        categories.push('standard_inpainting');
    }
    shuffleArray(categories);

    questions = [];
    for (let i = 0; i < numToPick; i++) {
        let basename = selectedBasenames[i];
        let category = categories[i];
        
        let imagePath = "";
        let expectedAnswer = "";
        
        if (category === 'originals') {
            imagePath = `aistudy_data/originals/${basename}_orig.jpg`;
            expectedAnswer = "Real";
        } else if (category === 'inpainting_exchange') {
            imagePath = `aistudy_data/inpainting_exchange/${basename}_exc.jpg`;
            expectedAnswer = "AI-Manipulated";
        } else if (category === 'standard_inpainting') {
            imagePath = `aistudy_data/standard_inpainting/${basename}_std.jpg`;
            expectedAnswer = "AI-Manipulated";
        }

        questions.push({
            id: basename,
            category: category,
            image_path: imagePath,
            expected_answer: expectedAnswer
        });
    }

    document.getElementById('total-q').textContent = currentMaxQuestions;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('progress-bar').style.width = `${((currentQuestionIndex + 1) / currentMaxQuestions) * 100}%`;

    document.getElementById('experiment-img').src = q.image_path;

    // Reset UI
    document.getElementById('confidence-section').classList.add('hidden');
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'wrong');
        btn.disabled = false;
    });
    
    // Clear confidence
    document.querySelectorAll('.confidence-opt').forEach(opt => opt.classList.remove('selected'));
    currentSelectionValue = null;
}

let currentSelectionValue = null;

function handleAnswer(answerValue) {
    currentSelectionValue = answerValue;

    // Highlight selected button
    const btns = document.querySelectorAll('#options-container .option-btn');
    btns.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === answerValue) btn.classList.add('selected');
    });

    // Show Confidence Section
    document.getElementById('confidence-section').classList.remove('hidden');
}

// Confidence Logic
document.querySelectorAll('.confidence-opt').forEach(opt => {
    opt.onclick = () => {
        const confidenceVal = parseInt(opt.dataset.value);

        // Visual selection
        document.querySelectorAll('.confidence-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        // Delay briefly then confirm
        setTimeout(() => {
            confirmAnswer(confidenceVal);
        }, 300);
    };
});

function confirmAnswer(confidenceVal) {
    if (!currentSelectionValue) return;

    const q = questions[currentQuestionIndex];
    const isCorrect = (currentSelectionValue === q.expected_answer);

    // Record response
    userResponses.push({
        questionId: q.id,
        category: q.category,
        imagePath: q.image_path,
        userAnswer: currentSelectionValue,
        expectedAnswer: q.expected_answer,
        isCorrect: isCorrect,
        confidence: confidenceVal
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < currentMaxQuestions) {
        showQuestion();
    } else {
        showCompletion();
    }
}

function continueExperiment() {
    document.getElementById('completion-area').classList.add('hidden');
    document.getElementById('advanced-stats').classList.add('hidden');
    
    // Create new session with same demographics
    createExperimentSession();

    currentQuestionIndex = 0;
    userResponses = [];
    experimentStartTime = new Date();
    
    loadQuestions();
    
    // showQuestion forms part of loadQuestions
    if (currentMaxQuestions > 0 && questions.length > 0) {
        document.getElementById('experiment-area').classList.remove('hidden');
    }
}

function showCompletion() {
    document.getElementById('experiment-area').classList.add('hidden');
    document.getElementById('completion-area').classList.remove('hidden');

    // Calculate accuracies
    let stats = {
        'originals': { correct: 0, total: 0 },
        'inpainting_exchange': { correct: 0, total: 0 },
        'standard_inpainting': { correct: 0, total: 0 },
        'total': { correct: 0, total: 0 }
    };

    userResponses.forEach(r => {
        stats[r.category].total++;
        stats.total.total++;
        if (r.isCorrect) {
            stats[r.category].correct++;
            stats.total.correct++;
        }
    });

    const calcAcc = (cat) => stats[cat].total > 0 ? ((stats[cat].correct / stats[cat].total) * 100).toFixed(0) + '%' : '0%';

    let aiTotal = stats['inpainting_exchange'].total + stats['standard_inpainting'].total;
    let aiCorrect = stats['inpainting_exchange'].correct + stats['standard_inpainting'].correct;
    let aiCombinedAcc = aiTotal > 0 ? ((aiCorrect / aiTotal) * 100).toFixed(0) + '%' : '0%';

    document.getElementById('acc-orig').textContent = calcAcc('originals');
    document.getElementById('acc-ai-combined').textContent = aiCombinedAcc;
    document.getElementById('acc-exc').textContent = calcAcc('inpainting_exchange');
    document.getElementById('acc-std').textContent = calcAcc('standard_inpainting');
    document.getElementById('acc-total').textContent = calcAcc('total');

    // Submit to Firebase
    const durationSeconds = (new Date() - experimentStartTime) / 1000;
    
    const submissionData = {
        responses: userResponses,
        accuracyStats: stats,
        durationSeconds: durationSeconds,
        endTime: firebase.firestore.FieldValue.serverTimestamp(),
        status: "completed"
    };

    if (db && currentDocId) {
        db.collection("experiments_aistudy").doc(currentDocId).update(submissionData)
            .then(() => console.log("Final data saved successfully."))
            .catch(e => console.error("Error saving final data:", e));
    } else if (db) {
        submissionData.demographics = demographics;
        submissionData.startTime = experimentStartTime;
        db.collection("experiments_aistudy").add(submissionData)
            .then(() => console.log("Final data saved successfully."))
            .catch(e => console.error("Error saving final data:", e));
    }
}
