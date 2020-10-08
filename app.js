const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url);
    switch (url_parts.pathname){

        case '/':
            var content = ejs.render(index_page, {
                title : "Index ページ",
                content : "これはテンプレを使ってプログラムから値を参照しています"
            });
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/other':
            var content = ejs.render(other_page, {
                title : "Otherのページ",
                content : "これは新しく用意したページです"
            });
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.end('no page...');
            break;

    }
}
    
