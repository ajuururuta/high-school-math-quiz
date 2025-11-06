// DOM元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const currentScoreEl = document.getElementById('current-score');
const progressBar = document.getElementById('progress-bar');

// 答案与解析相关元素
const answerExplanation = document.getElementById('answer-explanation');
const correctIndicator = document.getElementById('correct-indicator');
const correctAnswerEl = document.getElementById('correct-answer');
const explanationText = document.getElementById('explanation-text');

// 结果屏幕元素
const finalScoreEl = document.getElementById('final-score');
const totalScoreEl = document.getElementById('total-score');
const maxPossibleScoreEl = document.getElementById('max-possible-score');

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
    submitBtn.addEventListener('click', submitAnswer);
    restartBtn.addEventListener('click', restartQuiz);
    
    // 更新进度条
    updateProgressBar();
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
    
    // 隐藏答案与解析区域
    answerExplanation.classList.add('hidden');
    
    // 清空选项容器
    optionsContainer.innerHTML = '';
    
    // 创建选项按钮
    question.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${option}</span>
        `;
        optionElement.dataset.index = i;
        
        // 如果用户已经选择了这个选项，添加选中样式
        if (userAnswers[index] === i) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(i));
        optionsContainer.appendChild(optionElement);
    });
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 选择选项
function selectOption(optionIndex) {
    // 如果已经提交了答案，不允许修改
    if (userAnswers[currentQuestionIndex] !== null && 
        !answerExplanation.classList.contains('hidden')) {
        return;
    }
    
    // 移除之前的选择
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // 标记当前选择
    options[optionIndex].classList.add('selected');
    
    // 保存用户答案
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // 启用提交按钮
    submitBtn.disabled = false;
}

// 提交答案
function submitAnswer() {
    // 确保用户已选择答案
    if (userAnswers[currentQuestionIndex] === null) {
        alert('请先选择一个答案！');
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswerIndex = userAnswers[currentQuestionIndex];
    const isCorrect = userAnswerIndex === currentQuestion.correctIndex;
    
    // 更新选项样式以显示正确/错误
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === currentQuestion.correctIndex) {
            option.classList.add('correct');
        } else if (index === userAnswerIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none'; // 禁用点击
    });
    
    // 更新得分
    if (isCorrect) {
        score += currentQuestion.points;
        updateProgress();
    }
    
    // 显示答案与解析
    showAnswerExplanation(isCorrect, currentQuestion);
    
    // 更新导航按钮状态
    updateNavigationButtons();
}

// 显示答案与解析 
function showAnswerExplanation(isCorrect, question) {
    // 显示答案与解析区域
    answerExplanation.classList.remove('hidden');
    
    // 设置正确/错误指示器
    correctIndicator.textContent = isCorrect ? '回答正确！' : '回答错误！';
    correctIndicator.className = isCorrect ? 'correct' : 'incorrect';
    
    // 设置正确答案
    const correctOptionIndex = question.correctIndex;
    const correctOptionLetter = String.fromCharCode(65 + correctOptionIndex);
    correctAnswerEl.textContent = `${correctOptionLetter}. ${question.options[correctOptionIndex]}`;
    
    // 设置解析文本
    explanationText.textContent = question.explanation;
}

// 更新导航按钮状态
function updateNavigationButtons() {
    // 上一题按钮 - 只有在不是第一题时启用
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // 下一题按钮 - 只有在已回答当前题且不是最后一题时显示
    const isAnswered = userAnswers[currentQuestionIndex] !== null;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    
    if (isAnswered && !isLastQuestion) {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    } else if (isAnswered && isLastQuestion) {
        // 最后一题已答，显示完成测验按钮
        nextBtn.style.display = 'none';
        submitBtn.textContent = '完成测验';
        submitBtn.removeEventListener('click', submitAnswer);
        submitBtn.addEventListener('click', showResults);
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        submitBtn.textContent = '提交答案';
    }
}

// 显示上一题
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
    }
}

// 显示下一题
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
    }
}

// 显示结果
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // 更新结果屏幕信息
    finalScoreEl.textContent = score;
    totalScoreEl.textContent = score;
}

// 更新进度
function updateProgress() {
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    currentScoreEl.textContent = score;
    updateProgressBar();
}

// 更新进度条
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const progressElement = document.querySelector('.progress');
    if (progressElement) {
        progressElement.style.width = `${progress}%`;
    }
}

// 重新开始测验
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    updateProgress();
    updateNavigationButtons();
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);
