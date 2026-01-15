export const addThousandSeparator =(num) => {
    if(num === null || isNaN(num)) return "";

    //Convert number to string to handle decimals
    const numStr = num.toString();
    const parts = numStr.split(".");
    
    let integerPart = parts[0];
    let fractionalPart = parts[1];

    //Regex for Indian Numbering System
    //It handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if(otherNumbers !== "") {
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree;
    }  

    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (transactions) => {
    if(!transactions || transactions.length === 0) {
        return [];
    }

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group transactions by date and sum amounts
    const dateMap = {};
    sortedTransactions.forEach(transaction => {
        const date = transaction.date;
        if(!dateMap[date]) {
            dateMap[date] = 0;
        }
        dateMap[date] += transaction.amount;
    });

    // Convert to array format for chart
    const chartData = Object.entries(dateMap).map(([date, amount]) => ({
        date,
        amount,
        formattedAmount: addThousandSeparator(amount)
    }));

    return chartData;
};

export const prepareExpenseLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Group transactions by date and sum amounts
    const dateMap = {};
    sortedTransactions.forEach(transaction => {
        const date = transaction.date;
        if (!dateMap[date]) {
            dateMap[date] = 0;
        }
        dateMap[date] += transaction.amount;
    });

    // Convert to array format for chart
    const chartData = Object.entries(dateMap).map(([date, amount]) => ({
        date,
        amount,
        formattedAmount: addThousandSeparator(amount)
    }));

    return chartData;
};
