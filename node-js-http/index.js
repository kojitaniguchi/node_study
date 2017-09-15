'use strict';

const http = require('http');
const jade = require('jade');
const auth = require('http-auth');
const basic = auth.basic(
  { realm: 'Enter username and password.' },
  (username, password, callback) => {
    callback(username === 'guest' && password === 'xaXZJQmE');
  });
const server = http.createServer(basic, (req, res) => {
    
    console.info('Requested by ' + req.connection.remoteAddress);

  if (req.url === '/logout') {
    res.writeHead(401, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end('ログアウトしました');
    return;
  }
    res.writeHead(200, {
	'Content-Type: 'text/plain; charset=utf-8'
    });
     switch (req.method) {
    case 'GET':
      if (req.url === '/enquetes/yaki-shabu') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: '焼き肉',
          secondItem: 'しゃぶしゃぶ'
        }));
      } else if (req.url === '/enquetes/rice-bread') {
        res.write(jade.renderFile('./form.jade', {
          path: req.url,
          firstItem: 'ごはん',
          secondItem: 'パン'
        }));
      }
      res.end();
      break;
  
   case 'POST':
      req.on('data', (data) => {
        const decoded = decodeURIComponent(data);
        console.info('[' + now + '] 投稿: ' + decoded);
        res.write('<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"></head><body><h1>' +
          decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
    default:
      break;
   }

}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});

const port = 8000;
server.listen(port, () => {
    console.log('Listening on ' + port);
});

