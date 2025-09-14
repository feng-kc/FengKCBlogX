class BlogX {
    constructor() {
        this.articles = [];
        this.currentArticle = null;
        this.searchTerm = '';
        this.theme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.applyTheme();
        await this.loadArticles();
        this.renderArticleList();
    }

    setupEventListeners() {
        document.getElementById('search-btn').addEventListener('click', () => this.handleSearch());
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
    }

    async loadArticles() {
        try {
            // 手动定义文章列表，避免跨域问题
            this.articles = [
                {
                    title: '欢迎来到BlogX',
                    filename: '欢迎来到BlogX.md',
                    path: '/files/欢迎来到BlogX.md'
                },
                {
                    title: 'JavaScript基础教程',
                    filename: 'JavaScript基础教程.md',
                    path: '/files/JavaScript基础教程.md'
                },
                {
                    title: 'Python数据分析入门',
                    filename: 'Python数据分析入门.md',
                    path: '/files/Python数据分析入门.md'
                }
            ];
            
        } catch (error) {
            console.error('加载文章失败:', error);
            this.showError('无法加载文章列表，请检查文件目录');
        }
    }

    renderArticleList() {
        const articleList = document.getElementById('article-list');
        const filteredArticles = this.searchTerm ? 
            this.articles.filter(article => 
                article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
            ) : this.articles;

        articleList.innerHTML = filteredArticles.length ? '' : '<div class="no-results">没有找到匹配的文章</div>';
        
        filteredArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'article-item';
            if (this.currentArticle && this.currentArticle.title === article.title) {
                articleElement.classList.add('active');
            }
            articleElement.textContent = article.title;
            articleElement.addEventListener('click', () => this.loadArticle(article));
            articleList.appendChild(articleElement);
        });
    }

    async loadArticle(article) {
        try {
            document.getElementById('article-display').innerHTML = '<div class="loading">加载中...</div>';
            
            // 对中文文件名进行编码处理
            const encodedPath = encodeURI(article.path);
            const response = await fetch(encodedPath);
            if (!response.ok) throw new Error('文件加载失败');
            
            const content = await response.text();
            this.currentArticle = article;
            this.renderArticle(content);
            this.renderArticleList();
            
        } catch (error) {
            console.error('加载文章内容失败:', error);
            this.showError('无法加载文章内容，请确保服务器正在运行');
        }
    }

    renderArticle(content) {
        const articleDisplay = document.getElementById('article-display');
        
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            }
        });

        let html = marked.parse(content);
        
        if (this.searchTerm) {
            const regex = new RegExp(this.searchTerm, 'gi');
            html = html.replace(regex, match => 
                `<span class="search-highlight">${match}</span>`
            );
        }

        html = html.replace(/<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g, 
            (match, lang, code) => `
                <div class="code-block">
                    <button class="copy-btn" onclick="BlogX.copyToClipboard(this)">复制</button>
                    <pre><code class="language-${lang}">${code}</code></pre>
                </div>
            `
        );

        const articleHTML = `
            <article class="article-content">
                <header class="article-header">
                    <h1 class="article-title">${this.currentArticle.title}</h1>
                    <div class="article-date">${new Date().toLocaleDateString('zh-CN')}</div>
                </header>
                <div class="markdown-content">${html}</div>
            </article>
        `;

        articleDisplay.innerHTML = articleHTML;
        
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    }

    handleSearch() {
        this.searchTerm = document.getElementById('search-input').value.trim();
        this.renderArticleList();
        
        if (this.searchTerm && this.currentArticle) {
            this.loadArticle(this.currentArticle);
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        document.getElementById('theme-toggle').textContent = this.theme === 'light' ? '🌙' : '☀️';
    }

    showError(message) {
        document.getElementById('article-display').innerHTML = `
            <div class="error-message">
                <h3>错误</h3>
                <p>${message}</p>
            </div>
        `;
    }

    static copyToClipboard(button) {
        const code = button.nextElementSibling.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = button.textContent;
            button.textContent = '已复制!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.BlogX = new BlogX();
});