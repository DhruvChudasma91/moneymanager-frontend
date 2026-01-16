import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({transactions, onMore, type, title}) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
                <button
                    onClick={onMore}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors duration-200"
                >
                    More <ArrowRight size={16} />
                </button>
            </div>

            <div className="space-y-2">
                {transactions?.length > 0 ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard 
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">No {type}s yet</p>
                )}
            </div>
        </div>
    );
}

export default Transactions;