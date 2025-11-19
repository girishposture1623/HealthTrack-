const entryConfig = {
  calories: { icon: "🔥", color: "red-100", title: "Calories", unit: "kcal" },
  water: { icon: "💧", color: "blue-100", title: "Water", unit: "ml" },
  steps: { icon: "👟", color: "green-100", title: "Steps", unit: "steps" },
};

const formatDateTime = (isoDate) => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EntryListItem({ entry, removeEntry }) {
  const config = entryConfig[entry.type] || {};

  return (
    <li
      className={`p-3 md:p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all transform hover:scale-[1.01] hover:shadow-lg bg-${config.color}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <span className="font-bold text-gray-800 text-lg">
            {entry.value} {config.unit}
          </span>
          <p className="text-gray-600 text-sm mt-0.5">
            {config.title} • {formatDateTime(entry.date)}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeEntry(entry._id)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors self-end sm:self-auto"
        title="Delete Entry"
      >
        🗑️
      </button>
    </li>
  );
}