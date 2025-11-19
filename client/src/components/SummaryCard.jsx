const entryConfig = {
  calories: { color: "red-100", title: "Calories" },
  water: { color: "blue-100", title: "Water" },
  steps: { color: "green-100", title: "Steps" },
};

export default function SummaryCard({ totals }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mb-8 border-t-4 border-indigo-500">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Today's Progress</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {Object.entries(totals).map(([key, value]) => (
          <div key={key} className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-300">
            <p className="text-2xl font-extrabold text-indigo-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{entryConfig[key].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}