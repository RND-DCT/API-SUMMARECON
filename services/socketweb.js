const WebSocket = require('ws');

const clients = new Set();
const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log("🚀 WebSocket Server running on ws://localhost:8080");
});

wss.on('connection', (ws) => {
    console.log("🔗 Client WebSocket terhubung");
    clients.add(ws);

    ws.on('close', () => {
        console.log("❌ Client WebSocket terputus");
        clients.delete(ws);
    });
});

function broadcast(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { wss, broadcast };