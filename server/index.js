import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const server = createServer(app);

// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Create WebSocket server with proper configuration
const wss = new WebSocketServer({ 
  server,
  path: '/ws',
  clientTracking: true,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

const clients = new Map(); // Map to store client connections with their user info

const heartbeat = (ws) => {
  ws.isAlive = true;
};

const ping = () => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
};

const broadcastUserList = () => {
  const userList = Array.from(clients.values()).map(client => client.user);
  const message = JSON.stringify({
    type: 'userList',
    users: userList
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      client.send(message);
    }
  });
};

wss.on('connection', (ws, req) => {
  console.log('New client connected from:', req.socket.remoteAddress);
  ws.isAlive = true;

  ws.on('pong', () => heartbeat(ws));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === 'join') {
        // Store user info with the connection
        clients.set(ws, { ws, user: data.user });
        // Broadcast updated user list to all clients
        broadcastUserList();
      } else if (data.type === 'message') {
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // OPEN
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (error) {
      console.error('Failed to process message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected:', req.socket.remoteAddress);
    clients.delete(ws);
    broadcastUserList(); // Update user list when someone disconnects
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
    broadcastUserList(); // Update user list on error
  });
});

// Set up the heartbeat interval
const interval = setInterval(ping, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});