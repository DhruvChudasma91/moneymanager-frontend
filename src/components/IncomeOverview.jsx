import { useEffect, useState } from "react";

const IncomeOverview = ({transactions}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>

                <div className="mt-10">
                    Line chart
                </div>   
            </div>
        </div>
    )
}

export default IncomeOverview;