// 高中数学题库 - 包含详细解析
const questions = [
    {
        question: "从1到N这N个数中，进行4次随机（不重复）采样，得到x₁，x₂，x₃和x₄这四个数，请选择最合理的估计N的大小的式子。",
        options: [
            "N = (x₁+x₂+x₃+x₄)/2",
            "N = x₄*(5/4)", 
            "N = [(x₁+x₄)²+(x₂+x₃)²]^0.5",
            "N = [(x₁+x₄)²+(x₂+x₃)²+(x₁+x₂)²+(x₃+x₄)²]^0.5"
        ],
        correctIndex: 1,
        points: 5,
        explanation: "《人教B版高中数学必修第二册》§5.2 数学探究活动课“由编号样本估计总数及其模拟”问题的数学语言描述；无论是教材使用的n个区间的平均长度，还是一致最小方差无偏估计，它们的实质都可以分割区间思想理解。"
    },
    {
        question: "在平面直角坐标系中，已知点A、点B、点C坐标，射线AD平分∠BAC，以下哪种方法是一般情况下求直线AD方程的最佳方法？",
        options: [
            "设E(x₀,y₀)在直线AD上，用 向量AE在向量AB上的投影的单位长度=向量AE在向量AC上的投影的单位长度 求出E的横纵坐标关系",
            "设直线AD方程，用点B和点C到直线AD距离相同建立等式关系求直线AD方程",
            "不妨让D在线段BC上，找到D的位置再写出直线AD的方程", 
            "由角平分线的性质可写出向量AD的方向向量，由其方向向量可得到直线AD的倾斜角"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "以上方法都没错，其中选项A和D的思路更好，而选项A的方案求出x₀和y₀的关系即为直线AD的方程，过程比选项D方案的过程简洁一些，故认为选项A最佳"
    },
    {
        question: "除形如 x/a + y/a = 1 (a≠0) 的直线方程以外的直线方程x、y轴上的截距不相同。",
        options: ["正确", "错误"],
        correctIndex: 1,
        points: 5,
        explanation: "直线方程 y = kx (k≠0) 在x、y轴上的截距均为0"
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
