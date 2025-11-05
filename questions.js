// 高中数学题库 - 包含详细解析
const questions = [
    {
        question: "一元二次方程 ax² + bx + c = 0 (a ≠ 0) 的求根公式是？",
        options: [
            "x = [-b ± √(b² - 4ac)] / (2a)",
            "x = [b ± √(b² - 4ac)] / (2a)", 
            "x = [-b ± √(b² + 4ac)] / (2a)",
            "x = [b ± √(b² + 4ac)] / (2a)"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "一元二次方程的求根公式（也称为公式法）是通过配方法推导得出的，用于求解形如 ax² + bx + c = 0 的方程。其中判别式 Δ = b² - 4ac 决定了根的个数和性质：当 Δ > 0 时有两个不等实根，Δ = 0 时有两个相等实根，Δ < 0 时有两个共轭虚根。"
    },
    {
        question: "下列哪个函数在定义域内是单调递增的？",
        options: [
            "y = -2x + 3",
            "y = x²",
            "y = 3x - 1", 
            "y = -x² + 4"
        ],
        correctIndex: 2,
        points: 5,
        explanation: "一次函数 y = kx + b 的单调性由斜率 k 决定：当 k > 0 时函数单调递增，当 k < 0 时函数单调递减。选项 C 中斜率 k = 3 > 0，因此在定义域 R 内单调递增。而二次函数 y = x² 在 x < 0 时递减，在 x > 0 时递增，不是在整个定义域内单调。"
    },
    {
        question: "三角函数 sin(90°) 的值是多少？",
        options: ["0", "1/2", "√2/2", "1"],
        correctIndex: 3,
        points: 5,
        explanation: "在单位圆中，正弦函数表示角的终边与单位圆交点的 y 坐标。90° 角对应的终边与单位圆交于点 (0, 1)，其 y 坐标为 1，因此 sin(90°) = 1。这是三角函数的基本特殊角值之一，需要熟记。"
    },
    {
        question: "圆的面积公式是？",
        options: [
            "A = πr",
            "A = 2πr", 
            "A = πr²",
            "A = 2πr²"
        ],
        correctIndex: 2,
        points: 5,
        explanation: "圆的面积公式 A = πr² 可以通过将圆分割成无数个小扇形并重新排列近似为一个长方形来推导。其中 π 是圆周率（约等于 3.14159），r 是圆的半径。2πr 是圆的周长公式，不要混淆。"
    },
    {
        question: "下列哪个是勾股定理的正确表达式？",
        options: [
            "a² + b² = c²",
            "a + b = c",
            "a² - b² = c²",
            "a × b = c²"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "勾股定理指出：在直角三角形中，两条直角边的平方和等于斜边的平方。如果直角三角形的两条直角边长度分别为 a 和 b，斜边长度为 c，则 a² + b² = c²。这个定理是几何学中最基本也是最重要的定理之一，有超过400种证明方法。"
    },
    {
        question: "对数函数 log₁₀(100) 的值是多少？",
        options: ["1", "2", "10", "100"],
        correctIndex: 1,
        points: 5,
        explanation: "对数函数 log₁₀(100) 表示 10 的多少次方等于 100。因为 10² = 100，所以 log₁₀(100) = 2。对数是幂运算的逆运算，是高中数学中的重要概念。"
    },
    {
        question: "等差数列的通项公式是？",
        options: [
            "aₙ = a₁ + (n-1)d",
            "aₙ = a₁ × rⁿ⁻¹", 
            "aₙ = a₁ + nd",
            "aₙ = a₁ × rⁿ"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "等差数列的通项公式 aₙ = a₁ + (n-1)d 中，a₁ 是首项，d 是公差，n 是项数。这个公式表示等差数列中任意一项的值等于首项加上项数减1乘以公差。"
    },
    {
        question: "二次函数 y = ax² + bx + c 的顶点坐标是？",
        options: [
            "(-b/2a, c - b²/4a)",
            "(-b/2a, (4ac - b²)/4a)",
            "(b/2a, (4ac - b²)/4a)",
            "(b/2a, c - b²/4a)"
        ],
        correctIndex: 1,
        points: 5,
        explanation: "二次函数 y = ax² + bx + c 的顶点坐标公式为 (-b/2a, (4ac - b²)/4a)。这个顶点是二次函数图像（抛物线）的最高点或最低点，也是对称轴与抛物线的交点。"
    },
    {
        question: "下列哪个是三角恒等式？",
        options: [
            "sin²θ + cos²θ = 1",
            "sinθ + cosθ = 1", 
            "tanθ = sinθ × cosθ",
            "cotθ = sinθ / cosθ"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "sin²θ + cos²θ = 1 是最基本的三角恒等式，称为毕达哥拉斯恒等式。它表示对于任意角 θ，其正弦的平方与余弦的平方之和恒等于 1。这个恒等式在三角函数的化简和证明中非常重要。"
    },
    {
        question: "概率的基本性质中，事件发生的概率P(A)的取值范围是？",
        options: [
            "0 ≤ P(A) ≤ 1",
            "P(A) ≥ 0", 
            "P(A) ≤ 1",
            "-1 ≤ P(A) ≤ 1"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "概率的公理化定义要求任何事件 A 的概率 P(A) 满足 0 ≤ P(A) ≤ 1。其中 P(A) = 0 表示事件不可能发生，P(A) = 1 表示事件必然发生。这是概率论最基本的性质之一。"
    }
];
