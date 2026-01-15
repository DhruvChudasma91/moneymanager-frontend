import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({transactions, onMore, type, title}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button
                onClick={onMore}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-lg hover:bg-purple-50 transition-all duration-200 cursor-pointer"
                >
                    More <ArrowRight size={15} />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard 
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    )
}

export default Transactions;