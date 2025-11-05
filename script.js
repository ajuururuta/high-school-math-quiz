// DOM元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const currentScoreEl = document.getElementById('current-score');
const progressEl = document.getElementById('progress');

// 结果屏幕元素
const finalScoreEl = document.getElementById('final-score');
const totalScoreEl = document.getElementById('total-score');
const maxPossibleScoreEl = document.getElementById('max-possible-score');
const correctAnswersEl = document.getElementById('correct-answers');
const totalAnsweredEl = document.getElementById('total-answered');
const accuracyEl = document.getElementById('accuracy');

// 开始屏幕信息元素
const infoTotalQuestions = document.getElementById('info-total-questions');
const infoPointsPerQuestion = document.getElementById('info-points-per-question');
const infoMaxScore = document.getElementById('info-max-score');

// 全局变量
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let maxPossibleScore = 0;

// 初始化函数
function init() {
    // 设置题目总数
    const totalQuestions = questions.length;
    totalQuestionsEl.textContent = totalQuestions;
    infoTotalQuestions.textContent = totalQuestions;
    
    // 计算最大可能得分
    questions.forEach(q => {
        maxPossibleScore += q.points;
    });
    
    infoMaxScore.textContent = maxPossibleScore;
    maxPossibleScoreEl.textContent = maxPossibleScore;
    
    // 设置每题分值（取第一题的分值作为示例）
    infoPointsPerQuestion.textContent = questions[0].points;
    
    // 初始化用户答案数组
    userAnswers = new Array(totalQuestions).fill(null);
    
    // 设置事件监听器
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
}

// 开始测验
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion(currentQuestionIndex);
    updateProgress();
}

// 显示题目
function showQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.question;
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 创建选项按钮
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        optionElement.dataset.index = i;
        
        // 如果用户已经选择了这个选项，添加选中样式
        if (userAnswers[index] === i) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
    
    // 更新导航按钮状态
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

// 选择选项
function selectOption(optionIndex) {
    // 移除之前的选择
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // 标记当前选择
    options[optionIndex].classList.add('selected');
    
    // 保存用户答案
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // 立即计算并更新得分
    calculateScore();
    updateProgress();
}

// 计算得分
function calculateScore() {
    score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] !== null && userAnswers[i] === questions[i].correctIndex) {
            score += questions[i].points;
        }
    }
}

// 更新进度和得分显示
function updateProgress() {
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    currentScoreEl.textContent = score;
    
    // 计算已回答题目数
    const answeredCount = userAnswers.filter(answer => answer !== null).length;
    totalAnsweredEl.textContent = answeredCount;
}

// 显示上一题
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

// 显示下一题
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

// 提交测验
function submitQuiz() {
    // 确保所有题目都已回答
    const unanswered = userAnswers.filter(answer => answer === null).length;
    if (unanswered > 0) {
        if (!confirm(`您还有 ${unanswered} 道题未回答，确定要提交吗？`)) {
            return;
        }
    }
    
    // 计算最终得分
    calculateScore();
    
    // 显示结果屏幕
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // 更新结果屏幕信息
    finalScoreEl.textContent = score;
    totalScoreEl.textContent = score;
    
    // 计算答对题数
    const correctCount = userAnswers.reduce((count, answer, index) => {
        return count + (answer === questions[index].correctIndex ? 1 : 0);
    }, 0);
    
    correctAnswersEl.textContent = correctCount;
    
    // 计算正确率
    const accuracy = questions.length > 0 ? (correctCount / questions.length * 100).toFixed(1) : 0;
    accuracyEl.textContent = `${accuracy}%`;
}

// 查看答案
function reviewAnswers() {
    // 这里可以实现查看详细答案的功能
    alert('查看答案功能正在开发中...');
}

// 重新开始测验
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    updateProgress();
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);
