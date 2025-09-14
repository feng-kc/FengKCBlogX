# BlogX - 现代化个人博客平台

BlogX 是一个基于现代Web技术的个人博客平台，支持Markdown文章展示、搜索功能和主题切换。

## 功能特性

- 🎨 精美的现代化UI设计
- 📝 完整的Markdown支持（表格、代码块、语法高亮）
- 🔍 实时文章搜索功能
- 🌙 明暗主题切换
- 📱 完全响应式设计
- ⚡ 快速加载和流畅体验
- 📋 代码复制功能

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- Marked.js - Markdown解析
- Highlight.js - 代码语法高亮
- 纯前端实现，无需后端

## 安装和使用

1. 克隆或下载项目文件
2. 确保Node.js已安装（用于本地服务器）
3. 在项目根目录运行：
   ```bash
   node server.js
   ```
4. 打开浏览器访问：http://localhost:3000

## 添加文章

1. 在 `files/` 目录下创建 `.md` 文件
2. 文件命名格式：`文章标题.md`
3. 使用标准Markdown语法编写内容
4. 刷新页面即可看到新文章

## 文章格式示例

```markdown
# 文章标题

这是文章内容...

## 二级标题

- 列表项1
- 列表项2

```javascript
// 代码示例
function example() {
    return "Hello World!";
}
```

| 表格 | 示例 |
|------|------|
| 单元格1 | 单元格2 |
```

## 项目结构

```
BlogX/
├── index.html          # 主页面
├── server.js           # 本地服务器
├── README.md          # 说明文档
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── app.js         # 主要逻辑
└── files/             # Markdown文章目录
    ├── 欢迎来到BlogX.md
    ├── JavaScript基础教程.md
    └── Python数据分析入门.md
```

## 自定义配置

### 修改主题颜色
在 `css/style.css` 中修改CSS变量：
```css
:root {
    --accent-color: #你的颜色;
}
```

### 添加新功能
主要逻辑在 `js/app.js` 中的 `BlogX` 类中实现。

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 许可证

MIT License
作者:FengKC

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 更新日志

### v1.0.0
- 初始版本发布
- 基础Markdown渲染
- 搜索和主题功能
- 响应式设计