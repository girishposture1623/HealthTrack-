


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// FIXED MONGODB URI
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.error('MongoDB Error:', e.message));

// --- Mongoose Schema and Model ---
const EntrySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    notes: String
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', EntrySchema);


// CREATE (POST)
app.post('/api/entries', async (req, res) => {
  try {
    const entry = await Entry.create(req.body);
    res.json(entry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ (GET)
app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort('-date');
    res.json(entries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ⭐ DELETE (REMOVE) - ADDED ROUTE ⭐
app.delete('/api/entries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Check if the ID format is valid (Mongoose check)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID format.' });
    }

    // 2. Find and delete the entry by its ID
 const entry = await Entry.findByIdAndDelete(id);

    // 3. Check if an entry was actually found and deleted
    if (!entry) {
        return res.status(404).json({ error: 'Entry not found.' });
    }

    // 4. Send success response
    res.status(200).json({ message: 'Entry deleted successfully', entry });
  } catch (e) {
    console.error("Deletion Error:", e.message);
    res.status(500).json({ error: 'Failed to delete entry from database.' });
  }
});
// -----------------------------------------------------------------

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`HealthTrack server running on port ${PORT}`));