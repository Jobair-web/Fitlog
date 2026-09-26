export default function MetricsSummary({
  exercises,
  minutes,
  calories,
}: {
  exercises: number;
  minutes: number;
  calories: number;
}) {
  return (
    <div className="bg-[#111622] border border-gray-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4 text-left shadow-lg">
      <div>
        <span className="text-xs text-gray-400 font-medium block mb-1">Exercises</span>
        <span className="text-3xl sm:text-4xl font-extrabold text-[#CCFF00]">
          {exercises}
        </span>
      </div>

      <div className="border-l border-gray-800/80 pl-6">
        <span className="text-xs text-gray-400 font-medium block mb-1">Minutes</span>
        <span className="text-3xl sm:text-4xl font-extrabold text-white">
          {minutes}
        </span>
      </div>

      <div className="border-l border-gray-800/80 pl-6">
        <span className="text-xs text-gray-400 font-medium block mb-1">Calories</span>
        <span className="text-3xl sm:text-4xl font-extrabold text-white">
          {calories}
        </span>
      </div>
    </div>
  );
}