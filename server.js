const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    res.send(data);
  });
});

app.post('/data', (req, res) => {
  const rows = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2), (err) => {
    if (err) return res.status(500).send('Error saving data');
    res.send({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
