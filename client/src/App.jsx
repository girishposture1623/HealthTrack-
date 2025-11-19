import { useEffect, useState, useMemo } from "react";
import axios from "axios";

// 1. Import Components
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import InputForm from "./components/InputForm";
import EntryListItem from "./components/EntryListItem";

// FIX: Use import.meta.env for modern bundlers (like Vite) to avoid 'process is not defined' error.
const API = import.meta.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5002/api';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [type, setType] = useState("calories");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  // --- API Handlers ---
  async function loadEntries() {
    setIsLoading(true);
    try {
      const r = await axios.get(`${API}/entries`);
      const sortedEntries = r.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(sortedEntries);
    } catch (error) {
      console.error("Error loading entries:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addEntry() {
    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    try {
      await axios.post(`${API}/entries`, {
        date: new Date(),
        type,
        value: Number(value),
      });

      setValue("");
      loadEntries();
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Failed to add entry.");
    }
  }

  async function removeEntry(id) {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`${API}/entries/${id}`);
        loadEntries();
      } catch (error) {
        // This catch block handles the server error (e.g., 404 or 500)
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry.");
      }
    }
  }

  // --- Calculations for Summary ---
  const totals = useMemo(() => {
    const today = new Date().toDateString();
    const dailyTotals = { calories: 0, water: 0, steps: 0 };
    
    entries.forEach(en => {
      if (new Date(en.date).toDateString() === today) {
        dailyTotals[en.type] += en.value;
      }
    });

    return dailyTotals;
  }, [entries]);

  // --- Component Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 p-4 md:p-6 lg:p-8 flex flex-col items-center">
      
      <Header />
      
      <SummaryCard totals={totals} />

      <InputForm 
        type={type} 
        setType={setType} 
        value={value} 
        setValue={setValue} 
        addEntry={addEntry} 
      />

      {/* Entries List Container */}
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center md:text-left">
          🕒 Recent Log
        </h2>
        
        {isLoading && <p className="text-center text-gray-500">Loading entries...</p>}
        
        {!isLoading && entries.length === 0 && (
            <div className="p-5 text-center bg-white rounded-xl shadow">
                <p className="text-gray-500">No entries yet. Start tracking your health!</p>
            </div>
        )}

        <ul className="space-y-3">
          {entries.map((en) => (
            <EntryListItem 
              key={en._id} 
              entry={en} 
              removeEntry={removeEntry} 
            />
          ))}
        </ul>
      </div>
      
    </div>
  );
}