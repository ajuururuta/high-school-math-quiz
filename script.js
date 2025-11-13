// DOM元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const markBtn = document.getElementById('mark-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const currentScoreEl = document.getElementById('current-score');
const progressBarEl = document.getElementById('progress-bar');
const timerEl = document.getElementById('timer');
const timerDisplay = document.getElementById('timer-display');

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

// 题目导航元素
const questionNavButtons = document.getElementById('question-nav-buttons');

// 模态框元素
const confirmModal = document.getElementById('confirm-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');

// 全局变量
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let maxPossibleScore = 0;
let markedQuestions = new Set();
let timerInterval = null;
let startTime = null;
let elapsedSeconds = 0;
let timerLimit = null;
let pendingModalAction = null;

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
    
    // 从localStorage恢复进度
    loadProgress();
    
    // 设置事件监听器
    startBtn.addEventListener('click', () => showConfirmModal('开始测验', '确定要开始测验吗？', startQuiz));
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitAnswer);
    restartBtn.addEventListener('click', () => showConfirmModal('重新开始', '确定要重新开始测验吗？所有进度将会丢失。', restartQuiz));
    markBtn.addEventListener('click', toggleMarkQuestion);
    modalConfirm.addEventListener('click', handleModalConfirm);
    modalCancel.addEventListener('click', hideModal);
    
    // 初始状态
    submitBtn.disabled = true;
    nextBtn.style.display = 'none';
    
    // 更新进度条
    updateProgressBar();
    
    // 创建题目导航按钮
    createQuestionNavigation();
    
    // 错误处理
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
}

// 全局错误处理
function handleGlobalError(event) {
    console.error('发生错误:', event.error);
    showNotification('发生了一个错误，但您的进度已保存。', 'error');
    saveProgress();
}

function handleUnhandledRejection(event) {
    console.error('未处理的Promise拒绝:', event.reason);
    showNotification('操作失败，请重试。', 'error');
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'error' ? '#f44336' : '#4caf50'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 模态框相关函数
function showConfirmModal(title, message, action) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    pendingModalAction = action;
    confirmModal.classList.add('active');
}

function hideModal() {
    confirmModal.classList.remove('active');
    pendingModalAction = null;
}

function handleModalConfirm() {
    if (pendingModalAction) {
        pendingModalAction();
    }
    hideModal();
}

// 保存和加载进度
function saveProgress() {
    try {
        const progress = {
            currentQuestionIndex,
            userAnswers,
            score,
            markedQuestions: Array.from(markedQuestions),
            elapsedSeconds,
            timestamp: Date.now()
        };
        // 验证数据有效性
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            localStorage.setItem('quizProgress', JSON.stringify(progress));
        }
    } catch (e) {
        console.error('保存进度失败:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('quizProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            // 检查是否在24小时内
            if (Date.now() - progress.timestamp < 24 * 60 * 60 * 1000) {
                // 验证数据完整性和有效性
                if (typeof progress.currentQuestionIndex === 'number' &&
                    progress.currentQuestionIndex >= 0 &&
                    progress.currentQuestionIndex < questions.length &&
                    Array.isArray(progress.userAnswers) &&
                    progress.userAnswers.length === questions.length &&
                    typeof progress.score === 'number' &&
                    progress.score >= 0) {
                    currentQuestionIndex = progress.currentQuestionIndex;
                    userAnswers = progress.userAnswers;
                    score = progress.score;
                    markedQuestions = new Set(progress.markedQuestions);
                    elapsedSeconds = progress.elapsedSeconds || 0;
                }
            }
        }
    } catch (e) {
        console.error('加载进度失败:', e);
        // 清除损坏的数据
        localStorage.removeItem('quizProgress');
    }
}

function clearProgress() {
    try {
        localStorage.removeItem('quizProgress');
    } catch (e) {
        console.error('清除进度失败:', e);
    }
}

// 计时器相关函数
function startTimer() {
    const enableTimerLimit = document.getElementById('enable-timer-limit');
    if (enableTimerLimit && enableTimerLimit.checked) {
        timerLimit = 30 * 60; // 30分钟
    }
    
    startTime = Date.now() - (elapsedSeconds * 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    let displaySeconds, displayMinutes;
    if (timerLimit) {
        const remaining = timerLimit - elapsedSeconds;
        if (remaining <= 0) {
            stopTimer();
            showNotification('时间到！测验将自动提交。', 'error');
            setTimeout(() => showResults(), 2000);
            return;
        }
        displayMinutes = Math.floor(remaining / 60);
        displaySeconds = remaining % 60;
        
        // 警告和危险状态
        if (remaining <= 60) {
            timerDisplay.classList.add('danger');
        } else if (remaining <= 300) {
            timerDisplay.classList.add('warning');
            timerDisplay.classList.remove('danger');
        } else {
            timerDisplay.classList.remove('warning', 'danger');
        }
    } else {
        displayMinutes = Math.floor(elapsedSeconds / 60);
        displaySeconds = elapsedSeconds % 60;
    }
    
    timerEl.textContent = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    
    // 每10秒自动保存一次
    if (elapsedSeconds % 10 === 0) {
        saveProgress();
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// 创建题目导航
function createQuestionNavigation() {
    questionNavButtons.innerHTML = '';
    questions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'question-nav-btn';
        btn.textContent = index + 1;
        btn.dataset.index = index;
        btn.addEventListener('click', () => jumpToQuestion(index));
        questionNavButtons.appendChild(btn);
    });
    updateQuestionNavigation();
}

function updateQuestionNavigation() {
    const buttons = questionNavButtons.querySelectorAll('.question-nav-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('active', 'answered', 'marked');
        if (index === currentQuestionIndex) {
            btn.classList.add('active');
        }
        if (userAnswers[index] !== null) {
            btn.classList.add('answered');
        }
        if (markedQuestions.has(index)) {
            btn.classList.add('marked');
        }
    });
}

function jumpToQuestion(index) {
    if (index >= 0 && index < questions.length) {
        currentQuestionIndex = index;
        showQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
        updateQuestionNavigation();
        saveProgress();
    }
}

// 标记题目
function toggleMarkQuestion() {
    if (markedQuestions.has(currentQuestionIndex)) {
        markedQuestions.delete(currentQuestionIndex);
        markBtn.classList.remove('marked');
        showNotification('已取消标记', 'info');
    } else {
        markedQuestions.add(currentQuestionIndex);
        markBtn.classList.add('marked');
        showNotification('已标记此题', 'info');
    }
    updateQuestionNavigation();
    saveProgress();
}

// 开始测验
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion(currentQuestionIndex);
    updateProgress();
    startTimer();
    updateQuestionNavigation();
    updateMarkButton();
}

// 更新标记按钮状态
function updateMarkButton() {
    if (markedQuestions.has(currentQuestionIndex)) {
        markBtn.classList.add('marked');
    } else {
        markBtn.classList.remove('marked');
    }
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
    
    // 应用动态悬停效果到新创建的选项
    applyDynamicEffectsToOptions();
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
    
    // 保存进度并更新导航
    saveProgress();
    updateQuestionNavigation();
}

// 提交答案
function submitAnswer() {
    // 确保用户已选择答案
    if (userAnswers[currentQuestionIndex] === null) {
        showNotification('请先选择一个答案！', 'error');
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
        showNotification('回答正确！', 'info');
    } else {
        showNotification('回答错误，请查看解析。', 'error');
    }
    
    // 显示答案与解析
    showAnswerExplanation(isCorrect, currentQuestion);
    
    // 更新导航按钮状态
    updateNavigationButtons();
    
    // 保存进度
    saveProgress();
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
        // 确保只移除原来的 submitAnswer 处理器，再绑定 showResults
        submitBtn.removeEventListener('click', submitAnswer);
        submitBtn.removeEventListener('click', showResults);
        submitBtn.addEventListener('click', showResults);
        submitBtn.style.display = 'inline-block';
        submitBtn.disabled = false;
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        submitBtn.textContent = '提交答案';
        // 确保 submitBtn 回到提交答案的处理器
        submitBtn.removeEventListener('click', showResults);
        // 防止重复绑定 submitAnswer
        submitBtn.removeEventListener('click', submitAnswer);
        submitBtn.addEventListener('click', submitAnswer);
    }
}

// 显示上一题
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
        updateQuestionNavigation();
        updateMarkButton();
        saveProgress();
    }
}

// 显示下一题
function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
        updateNavigationButtons();
        updateQuestionNavigation();
        updateMarkButton();
        saveProgress();
    }
}

// 显示结果
function showResults() {
    stopTimer();
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // 更新结果屏幕信息
    finalScoreEl.textContent = score;
    totalScoreEl.textContent = score;
    
    // 清除保存的进度
    clearProgress();
    
    // 显示用时
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    showNotification(`测验完成！用时: ${minutes}分${seconds}秒`, 'info');
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
    if (progressBarEl) {
        progressBarEl.style.width = `${progress}%`;
    }
}

// 重新开始测验
function restartQuiz() {
    // 停止计时器
    stopTimer();
    
    // 重置数据
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    markedQuestions.clear();
    elapsedSeconds = 0;
    timerLimit = null;
    
    // 清除保存的进度
    clearProgress();
    
    // 恢复界面到起始状态
    resultsScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // 隐藏答案解析区并清空选项显示
    answerExplanation.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    // 恢复 submitBtn 的默认行为：移除 showResults 绑定，确保绑定 submitAnswer
    submitBtn.removeEventListener('click', showResults);
    submitBtn.removeEventListener('click', submitAnswer);
    submitBtn.addEventListener('click', submitAnswer);
    
    // 按钮与显示重置
    submitBtn.disabled = true;
    submitBtn.style.display = 'inline-block';
    submitBtn.textContent = '提交答案';
    nextBtn.style.display = 'none';
    prevBtn.disabled = true;
    
    // 重置计时器显示
    timerEl.textContent = '00:00';
    timerDisplay.classList.remove('warning', 'danger');
    
    // 更新进度显示与按钮状态
    updateProgress();
    updateNavigationButtons();
    updateQuestionNavigation();
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);

// 动态添加悬停发光效果
function addDynamicHoverEffects() {
    // 为所有按钮添加发光效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            this.style.filter = 'brightness(1.1) drop-shadow(0 0 15px rgba(107, 137, 153, 0.4))';
        });
        btn.addEventListener('mouseleave', function(e) {
            this.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
        });
    });
    
    // 为选项添加发光效果
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', function(e) {
            if (!this.classList.contains('correct') && !this.classList.contains('incorrect')) {
                this.style.filter = 'brightness(1.05) drop-shadow(0 0 10px rgba(212, 163, 115, 0.3))';
            }
        });
        option.addEventListener('mouseleave', function(e) {
            this.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
        });
    });
}

// 在显示题目时重新应用动态效果
function applyDynamicEffectsToOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', function(e) {
            if (!this.classList.contains('correct') && !this.classList.contains('incorrect')) {
                this.style.filter = 'brightness(1.05) drop-shadow(0 0 10px rgba(212, 163, 115, 0.3))';
            }
        });
        option.addEventListener('mouseleave', function(e) {
            this.style.filter = 'brightness(1) drop-shadow(0 0 0 transparent)';
        });
    });
}

// 初始调用
setTimeout(() => {
    addDynamicHoverEffects();
}, 100);
// 键盘导航支持
document.addEventListener('keydown', (e) => {
    // 如果模态框打开，只处理模态框相关按键
    if (confirmModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            hideModal();
        } else if (e.key === 'Enter') {
            handleModalConfirm();
        }
        return;
    }
    
    // 只在答题界面启用键盘导航
    if (!quizScreen.classList.contains('active')) {
        return;
    }
    
    switch(e.key) {
        case 'ArrowLeft':
            if (!prevBtn.disabled) {
                showPreviousQuestion();
            }
            break;
        case 'ArrowRight':
            if (nextBtn.style.display !== 'none') {
                showNextQuestion();
            }
            break;
        case 'Enter':
            if (!submitBtn.disabled && submitBtn.style.display !== 'none') {
                submitBtn.click();
            }
            break;
        case 'm':
        case 'M':
            toggleMarkQuestion();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            const index = parseInt(e.key) - 1;
            if (index < questions.length) {
                jumpToQuestion(index);
            }
            break;
    }
});

// 添加键盘快捷键说明到开始界面
window.addEventListener('DOMContentLoaded', () => {
    const startContent = document.querySelector('.start-content');
    if (startContent) {
        const keyboardHints = document.createElement('div');
        keyboardHints.className = 'keyboard-hints';
        keyboardHints.innerHTML = `
            <details>
                <summary style="cursor: pointer; color: #1e90ff; font-weight: 600; margin-top: 20px;">⌨️ 键盘快捷键</summary>
                <ul style="text-align: left; margin-top: 10px; color: #546e7a; font-size: 0.95rem;">
                    <li>← → 方向键: 上一题/下一题</li>
                    <li>Enter: 提交答案</li>
                    <li>M: 标记/取消标记</li>
                    <li>1-9: 直接跳转到对应题目</li>
                    <li>Esc: 关闭对话框</li>
                </ul>
            </details>
        `;
        startContent.appendChild(keyboardHints);
    }
});
