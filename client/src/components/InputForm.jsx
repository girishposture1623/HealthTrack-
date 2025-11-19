const entryConfig = {
  calories: { title: "Calories (kcal)" },
  water: { title: "Water (ml)" },
  steps: { title: "Steps" },
};

export default function InputForm({ type, setType, value, setValue, addEntry }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700">New Entry</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 items-center">
        <select
          className="border-2 border-indigo-400 p-2 rounded-lg w-full sm:w-1/3 lg:w-1/4 focus:ring-2 focus:ring-indigo-300 transition duration-150"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {Object.keys(entryConfig).map(key => (
            <option key={key} value={key}>{entryConfig[key].title}</option>
          ))}
        </select>

        <input
          className="border-2 border-green-400 p-2 rounded-lg w-full sm:flex-1 focus:ring-2 focus:ring-green-300 transition duration-150"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          type="number"
          min="1"
        />

        <button
          onClick={addEntry}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 w-full sm:w-auto transform hover:scale-105"
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}