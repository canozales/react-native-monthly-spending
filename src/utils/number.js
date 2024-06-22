export const filterOnlyDigits = (num) => {
  return num.replace(/\D/g, "");
};

export const thousandSeperator = (num) => {
  return num
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Eg. 2450000 into 2.45 M
export const convertMoney = (input) => {
  let number = typeof input === "string" ? parseFloat(input) : input;

  if (isNaN(number)) return "Invalid input";

  const suffixes = ["", "K", "M", "B"];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  const roundedNumber = Math.round(number * 1000) / 1000;
  const formattedNumber = Number.isInteger(roundedNumber)
    ? roundedNumber.toFixed(0)
    : roundedNumber.toFixed(3).replace(/\.?0+$/, "");

  return `${formattedNumber} ${suffixes[suffixIndex]}`;
};

export const getAverageLowestHighest = (data) => {
  if (data.length) {
    const lowestTotalAmount = Math.min(...data.map((item) => parseInt(item.total_amount)));
    const highestTotalAmount = Math.max(...data.map((item) => parseInt(item.total_amount)));
    const totalAmountSum = data.reduce((sum, item) => sum + parseInt(item.total_amount), 0);
    const averageTotalAmount = totalAmountSum / data.length;

    return [lowestTotalAmount, highestTotalAmount, averageTotalAmount];
  }

  return [0, 0, 0];
};

export const getSpendingPercentage = (data) => {
  // Total amounts per category
  const result = data.reduce((acc, current) => {
    const existingCategory = acc.find((item) => item.categoryName === current.categoryName);

    if (existingCategory) {
      existingCategory.amount = (
        parseInt(filterOnlyDigits(existingCategory.amount)) + parseInt(filterOnlyDigits(current.amount))
      ).toString();
    } else {
      acc.push({
        categoryName: current.categoryName,
        amount: current.amount,
      });
    }

    return acc;
  }, []);

  // Total amount across all categories
  const totalAmount = result.reduce((sum, item) => sum + parseInt(filterOnlyDigits(item.amount)), 0);

  // Percentage for each category
  result.forEach((item) => {
    const percentage = Math.floor((parseInt(filterOnlyDigits(item.amount)) / totalAmount) * 100);
    item.percentage = `${percentage}%`;
  });

  // Sort by percentage ASC
  result.sort((a, b) => {
    const percentageA = parseInt(a.percentage);
    const percentageB = parseInt(b.percentage);
    return percentageA - percentageB;
  });

  // Total Amount
  result.push({
    categoryName: "Total",
    amount: totalAmount.toString(),
    percentage: "100%",
  });

  return result;
};
