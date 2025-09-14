const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // 解码URL路径，处理中文文件名
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    let filePath = path.join(BASE_DIR, decodedPath);
    
    // 默认返回index.html
    if (parsedUrl.pathname === '/') {
        filePath = path.join(BASE_DIR, 'index.html');
    }
    
    // 处理文件请求 - 使用UTF-8编码读取文本文件
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);
    
    // 对于文本文件，使用UTF-8编码读取
    if (contentType.startsWith('text/') || contentType === 'application/javascript') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                handleFileError(err, res, parsedUrl);
                return;
            }
            
            res.writeHead(200, { 
                'Content-Type': contentType + '; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(data);
        });
    } else {
        // 对于二进制文件，使用默认编码
        fs.readFile(filePath, (err, data) => {
            if (err) {
                handleFileError(err, res, parsedUrl);
                return;
            }
            
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(data);
        });
    }
});

function listFiles(res) {
    const filesDir = path.join(BASE_DIR, 'files');
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            res.writeHead(500);
            res.end('Error reading directory');
            return;
        }
        
        const mdFiles = files.filter(file => file.endsWith('.md'));
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>文件列表</title>
            </head>
            <body>
                <h1>文件列表</h1>
                <ul>
                    ${mdFiles.map(file => `<li><a href="/files/${file}">${file}</a></li>`).join('')}
                </ul>
            </body>
            </html>
        `;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
}

function getContentType(ext) {
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.md': 'text/markdown',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    return contentTypes[ext] || 'text/plain';
}

function handleFileError(err, res, parsedUrl) {
    if (err.code === 'ENOENT') {
        // 文件不存在，尝试作为目录处理
        if (parsedUrl.pathname === '/files/') {
            listFiles(res);
            return;
        }
        res.writeHead(404);
        res.end('File not found');
    } else {
        res.writeHead(500);
        res.end('Server error');
    }
}

server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    process.exit(0);
});