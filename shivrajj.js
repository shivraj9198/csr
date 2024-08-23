// Import required modules
const express = require('express');
const app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const stockData = {};

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial stock data to client
  ws.send(JSON.stringify(stockData));

  // Handle incoming stock data from server
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { symbol, top_ask_price, timestamp } = data;

    // Aggregate duplicated data
    if (stockData[symbol]) {
      stockData[symbol].push({ top_ask_price, timestamp });
    } else {
      stockData[symbol] = [{ top_ask_price, timestamp }];
    }

    // Broadcast updated stock data to all clients
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(stockData));
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Serve client-side web application
app.use(express.static('public'));
app.listen(3000, () => {
  console.log('Server started on port 3000');
});




// Establish WebSocket connection
const ws = new WebSocket('ws://localhost:8080');

// Handle incoming stock data from server
ws.onmessage = (event) => {
  const stockData = JSON.parse(event.data);
  const symbol = Object.keys(stockData)[0];
  const data = stockData[symbol];

  // Update graph with new data
  const chart = document.getElementById('chart');
  const xValues = data.map((point) => point.timestamp);
  const yValues = data.map((point) => point.top_ask_price);
  // Use a charting library like Chart.js to update the graph
  chart.data.labels = xValues;
  chart.data.datasets[0].data = yValues;
  chart.update();
};

// Handle errors
ws.onerror = (event) => {
  console.error('WebSocket error:', event);
};

// Handle connection close
ws.onclose = () => {
  console.log('WebSocket connection closed');
};