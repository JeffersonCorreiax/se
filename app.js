const https = require('https');
const fs = require('fs');
const path = require('path');

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/vitaupadashboard.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vitaupadashboard.duckdns.org/fullchain.pem')
};

const server = https.createServer(sslOptions, (req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro interno do servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Página não encontrada');
    }
});

const PORT = 443;

server.listen(PORT, () => {
    console.log(`Servidor HTTPS rodando em: https://vitaupadashboard.duckdns.org`);
});