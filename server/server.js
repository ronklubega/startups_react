const express = require('express');
const cors = require('cors');
const Authrouter = require('./routes/auth_route.js'); // Use require for CommonJS

const app = express();
app.use(cors());
app.use(express.json());
// Use the correct path for the router
app.use('/auth/', Authrouter);

// app.get('/api', (req, res) => {
//   res.json({
//     users: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'],
//   });
// });

// Use a default port if DB_PORT is not defined
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});