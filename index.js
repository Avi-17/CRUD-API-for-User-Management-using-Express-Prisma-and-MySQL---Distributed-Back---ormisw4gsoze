const express = require('express');
const dotenv = require('dotenv'); 
dotenv.config(); 

const authRoutes = require("./routers/authRoutes");

const app = express();

app.use(express.json()); 

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});

module.exports=  app;