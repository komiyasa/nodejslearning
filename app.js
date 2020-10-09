const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

//Create Server で処理する関数
function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){

        case '/':
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type' : 'text/css' });
            response.write(style_css);
            response.end();
            break;
        
        default:
            response.writeHead(200, { 'Content-Type' : 'text/plain' });
            response.end('no page...');
            break;
    }
}

var data = {
    'Taro' : '09-999-999',
    'Hanako' : '080-888-888',
    'Sachiko' : '070-777-777',
    'Ichiro' : '060-666-666'
};

var data2 = {
    'Ichiro' : ['最強のアベレージヒッター', '09-999-999', 'Meiden'],
    'Matsui' : ['世界的ホームランバッター', '080-888-888', 'Seiryo'],
    'Maeda' : ['PL魂', '070-777-777', 'PL学園'],
    'Yu-Dalvish' : ['サイヤング賞頑張れ！', '060-666-666', 'Tohoku'],
}

//Index のアクセス処理
function response_index(request, response){
    var msg = "これは Index のページです。"
    var content = ejs.render(index_page, {
        title : "Index",
        content : msg,
        data : data,
        filename : 'data_item'
    });
    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.write(content);
    response.end();
}

//Oteher のアクセス処理
function response_other(request, response){
    var msg = "これは Other のページです。"
    var content = ejs.render(other_page, {
        title : "Other",
        content : msg,
        data : data2,
        filename : 'data_item'
    });
    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.write(content);
    response.end();
}

              
