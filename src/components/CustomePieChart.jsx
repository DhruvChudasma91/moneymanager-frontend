import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const CustomePieChart = ({
  data = [],
  label = "",
  totalAmount = "",
  colors = [],
  showTextAnchor = false
}) => {
  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* Chart */}
      <div className="relative w-full max-w-[260px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              innerRadius={85}
              outerRadius={115}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {showTextAnchor && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-2xl font-semibold text-gray-900 mt-1">
              &#8377;{totalAmount}
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomePieChart;
