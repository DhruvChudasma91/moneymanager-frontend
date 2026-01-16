const InfoCard = ({icon, label, value, color}) => {
    return(
        
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className={`w-14 h-14 flex items-center justify-center text-white ${color} rounded-full shrink-0`}>
                {icon}
            </div>
            <div className="flex flex-col justify-center min-w-0">
                <h6 className="text-sm text-gray-500 mb-1 font-medium">{label}</h6>
                <span className="text-2xl font-semibold text-gray-900 truncate">
                    &#8377;{value}
                </span>
            </div>
        </div>
    )
}

export default InfoCard;