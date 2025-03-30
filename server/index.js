const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors({
  origin: '*', // In production, replace with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Create WebSocket server with CORS support
const wss = new WebSocket.Server({ 
  server,
  path: '/ws',
  verifyClient: (info) => {
    // Allow all connections in development
    return true;
  }
});

// Store connected clients with their user info
const clients = new Map();

// Broadcast message to all connected clients
const broadcast = (message, exclude = null) => {
  clients.forEach((client, ws) => {
    if (ws !== exclude && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  });
};

// Broadcast user list to all clients
const broadcastUserList = () => {
  const userList = Array.from(clients.values()).map(client => client.username);
  broadcast({
    type: 'userList',
    users: userList
  });
};

wss.on('connection', (ws, req) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'join':
          // Store user info
          clients.set(ws, {
            username: data.username,
            ws: ws
          });
          
          // Broadcast join message
          broadcast({
            type: 'system',
            message: `${data.username} joined the chat`,
            timestamp: new Date().toISOString()
          });
          
          // Send welcome message to the new user
          ws.send(JSON.stringify({
            type: 'system',
            message: 'Welcome to the chat!',
            timestamp: new Date().toISOString()
          }));
          
          // Update user list
          broadcastUserList();
          break;

        case 'message':
          const user = clients.get(ws);
          if (user) {
            // Broadcast message to all clients
            broadcast({
              type: 'message',
              username: user.username,
              content: data.content,
              timestamp: new Date().toISOString()
            });
          }
          break;

        case 'typing':
          const typingUser = clients.get(ws);
          if (typingUser) {
            broadcast({
              type: 'typing',
              username: typingUser.username,
              isTyping: data.isTyping
            }, ws);
          }
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message'
      }));
    }
  });

  ws.on('close', () => {
    const user = clients.get(ws);
    if (user) {
      // Broadcast leave message
      broadcast({
        type: 'system',
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString()
      });
      
      // Remove user from clients
      clients.delete(ws);
      
      // Update user list
      broadcastUserList();
    }
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    const user = clients.get(ws);
    if (user) {
      clients.delete(ws);
      broadcastUserList();
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', connectedClients: clients.size });
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is available at ws://localhost:${PORT}/ws`);
}); 