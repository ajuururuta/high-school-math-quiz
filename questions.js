// 高中数学题库 - 包含详细解析
const questions = [
    {
        question: "除形如 x/a + y/a = 1 (a≠0) 的直线方程以外的直线方程x、y轴上的截距不相同。",
        options: [
            "正确", 
            "错误"
        ],
        correctIndex: 1,
        points: 5,
        explanation: "直线方程 y = kx (k≠0) 在x、y轴上的截距均为0"    },
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
        question: "直线ɭ: Ax + By + C = 0, 直线ɭ和直线ɭ'关于点(x₀,y₀)对称，直线ɭ'的方程为 A(2x₀-x) + B(2y₀-y) + C = 0",
        options: [
            "正确",
            "错误"
        ],
        correctIndex: 0,
        points: 5,
        explanation: "直线ɭ上的任意点(x,y)关于点(x₀,y₀)对称的点坐标为(2x₀-x,2y₀-y)。思想：线是点的集合。"
    },
    {
        question: "4条直线切割1个平面，最多将该平面切割为几个部分",
        options: [
            "13", 
            "12", 
            "11", 
            "9"
        ],
        correctIndex: 2,
        points: 5,
        explanation: "n点截线：Cn⁰  + Cn¹；n线截面：Cn⁰ + Cn¹。在此不详细证明。"
    },
    {
        question: "4个平面切割1个三维空间，最多将该空间切割为几个部分",
        options: [
            "13",
            "14",
            "15",
            "21"
        ],
        correctIndex: 2,
        points: 0,
        explanation: "由上题找规律：n面截三维空间得到 (Cn⁰ + Cn¹ + Cn³) 个部分"
    },
    {
        question: "平面内的两条直线不可以重合，空间内的两条直线不可以重合。（有争议，不计入总分）",
        options: [
            "正确",
            "错误",
        ],
        correctIndex: 1,
        points: 0,
        explanation: "平面内的两条直线可以重合，空间内的两条直线不可以重合。"
    }
];
