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
      <div className="relative w-[260px] h-[260px]">
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
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-2xl font-semibold text-gray-900">
              ₹{totalAmount}
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomePieChart;
