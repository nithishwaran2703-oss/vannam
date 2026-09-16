const https = require('https');

function follow(url, depth = 0) {
  if (depth > 6) return console.error('Too many redirects');
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    console.log('Depth', depth, 'Status:', res.statusCode, 'Location:', res.headers.location);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      follow(res.headers.location, depth + 1);
    } else {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/https:\/\/i\.pinimg\.com\/[^\s"'<>\)]+/g) || [];
        const filtered = matches.filter(m => m.includes('/originals/') || m.includes('/1200x/') || m.includes('/736x/'));
        console.log('Found image links:', [...new Set(filtered)]);
      });
    }
  }).on('error', err => console.error(err));
}

follow('https://pin.it/1gB7J3aNz');
