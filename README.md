# high-school-math-quiz
高中数学知识闯关

## 功能特性

### 📝 核心功能
- 9道精选高中数学题目
- 每题即时查看答案与解析
- 动态计分系统
- 美观的UI设计与动画效果

### ✨ 新增功能（v2.0）
- **⏱️ 计时器**: 可选30分钟限制或记录用时模式
- **🔖 标记功能**: 标记难题以便后续回顾
- **📊 进度指示**: 可视化答题进度条
- **🗺️ 题目导航**: 快速跳转到任意题目
- **💾 自动保存**: 每10秒自动保存答题进度
- **🔄 进度恢复**: 24小时内自动恢复未完成的测验
- **✅ 确认对话框**: 防止误操作
- **📱 响应式设计**: 完美支持移动端和平板设备
- **♿ 无障碍支持**: ARIA标签、键盘导航

### 🚀 性能优化
- 资源预加载和延迟加载
- 硬件加速的CSS动画
- 图片懒加载
- 优化的触摸交互

### 🔒 可靠性
- 全局错误处理机制
- LocalStorage数据持久化
- 输入验证和数据清理
- 无敏感数据泄漏

## 使用方法

### 在线访问
直接打开 `index.html` 文件在浏览器中运行。

### 本地开发
```bash
# 使用Python简单HTTP服务器
python3 -m http.server 8080

# 或使用Node.js的http-server
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

## 浏览器兼容性
- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ 移动端浏览器

## 技术栈
- 纯HTML5 + CSS3 + JavaScript
- 无框架依赖
- LocalStorage API
- CSS动画与过渡

## 文件结构
```
.
├── index.html          # 主页面
├── script.js           # 核心逻辑
├── questions.js        # 题库数据
├── styles.css          # 样式表
├── images/            # 图片资源
│   └── donation-qr.png
└── README.md          # 说明文档
```

## 贡献
欢迎提交问题和改进建议！

## 许可证
MIT License

