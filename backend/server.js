const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./Database/db'); // ✅ Corrected path

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< backend
=======
// Connect to MongoDB
connectDB(); // ✅ Using your centralized connection logic

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Root Route
app.get('/', (req, res) => res.send('🚀 Driftx Backend Running!'));

// Server Port
>>>>>>> local
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('DRIFT X Backend Running!'));

app.listen(PORT, () => {
<<<<<<< backend
  console.log(`Server running on port ${PORT}`);
});
=======
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
>>>>>>> local
