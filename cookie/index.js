'use strict'
const http = require('http');
const Cookies = require('cookies');
const trackingIdKey = 'tracking_id';

const server = http.createServer((req, res) => {
  const now = new Date().getTime();
  res.setHeader('Set-Cookie', 'last_access=' + now + ';expires=Mon, 07 Jan 2036 00:00:00 GMT;');
  const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;
  res.end(new Date(last_access_time).toString());
});

const port = 8000;
server.listen(port, () => {
  console.info(' Listening on ' + port);
});


 function handle(req, res) {
    const cookies = new Cookies(req, res);
    addTrackingCookie(cookie);
 }
 
 function addTrackingCookie(cookies) {
    if (!cookies.get(trackingIdKey)) {
	const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	const tomorrow = new Date(new Date().getrTime() + (1000 * 60 * 60 * 24 ));
	cookies.set(trackingIdKey, trakingId, { expires: tomorrow });
    }
 } 

