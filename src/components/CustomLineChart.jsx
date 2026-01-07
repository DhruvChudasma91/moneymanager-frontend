import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400">
                <p>No data available to display chart</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 border border-purple-500 rounded-lg p-2">
                    <p className="text-sm text-white">
                        {`Date: ${payload[0].payload.date}`}
                    </p>
                    <p className="text-sm text-purple-400">
                        {`Amount: ₹${payload[0].payload.formattedAmount}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                    dataKey="date" 
                    stroke="#888"
                    tick={{ fontSize: 12 }}
                />
                <YAxis 
                    stroke="#888"
                    tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                />
                <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    dot={{ fill: '#a855f7', r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    name="Income"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
