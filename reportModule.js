// MODULE 3: REPORT MODULE
// Data Structure: Dynamic Array / List
// Algorithm: QuickSort (Descending Order)

// Mock Historical Sales Dataset
const historicalSales = [
    { name: "Classic Milk Tea", unitsSold: 342, grossRevenue: 41040.00, date: "2026-09-01" },
    { name: "Brown Sugar Boba", unitsSold: 289, grossRevenue: 40460.00, date: "2026-09-01" },
    { name: "Cheese Fries", unitsSold: 180, grossRevenue: 15300.00, date: "2026-09-02" },
    { name: "Taro Milk Tea", unitsSold: 95, grossRevenue: 12350.00, date: "2026-09-03" },
    { name: "Chicken Poppers", unitsSold: 210, grossRevenue: 23100.00, date: "2026-09-03" },
    { name: "Matcha Latte", unitsSold: 140, grossRevenue: 18900.00, date: "2026-09-04" },
    { name: "Barbecue Fries", unitsSold: 180, grossRevenue: 15300.00, date: "2026-09-04" }, // Duplicate revenue tie test
    { name: "Mango Fruit Tea", unitsSold: 120, grossRevenue: 13800.00, date: "2026-09-05" },
    { name: "Tapioca Pearls", unitsSold: 500, grossRevenue: 10000.00, date: "2026-09-05" }, // High units, low revenue test
    { name: "Oolong Milk Tea", unitsSold: 88, grossRevenue: 11000.00, date: "2026-09-06" }
];

// Helper Function: Manual array concatenation (Replaces array spread [...left, pivot, ...right])
function manualCombineArrays(leftArr, pivotItem, rightArr) {
    const combined = [];
    let count = 0;

    for (let i = 0; i < leftArr.length; i++) {
        combined[count] = leftArr[i];
        count = count + 1;
    }

    combined[count] = pivotItem;
    count = count + 1;

    for (let j = 0; j < rightArr.length; j++) {
        combined[count] = rightArr[j];
        count = count + 1;
    }

    return combined;
}

// QuickSort Algorithm: Manual array placement (No .push())
function quickSortDescending(arr, sortByMetric) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1]; // Pick last item as pivot
    const left = [];
    let leftCount = 0;
    const right = [];
    let rightCount = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        // Higher values placed on left array for descending rank order
        if (arr[i][sortByMetric] > pivot[sortByMetric]) {
            left[leftCount] = arr[i];
            leftCount = leftCount + 1;
        } else {
            right[rightCount] = arr[i];
            rightCount = rightCount + 1;
        }
    }

    const sortedLeft = quickSortDescending(left, sortByMetric);
    const sortedRight = quickSortDescending(right, sortByMetric);

    return manualCombineArrays(sortedLeft, pivot, sortedRight);
}

function generateReportModule(startDate, endDate, sortByMetric) {
    console.log(`\n============================================================`);
    console.log(`SALES PERFORMANCE REPORT (${startDate} to ${endDate})`);
    console.log(`Sorted By: ${sortByMetric}`);
    console.log(`============================================================`);

    // 1. Filter dataset by date range using a manual for loop (No .filter())
    const reportData = [];
    let reportCount = 0;

    for (let i = 0; i < historicalSales.length; i++) {
        if (historicalSales[i].date >= startDate && historicalSales[i].date <= endDate) {
            reportData[reportCount] = historicalSales[i];
            reportCount = reportCount + 1;
        }
    }

    if (reportData.length === 0) {
        console.log("No transactions found for the specified date range.");
        return;
    }

    // 2. Sort filtered list descending using QuickSort
    const sortedReport = quickSortDescending(reportData, sortByMetric);

    // 3. Output formatted report using a manual loop (No .forEach())
    console.log("Rank | Item Name             | Units Sold | Gross Revenue");
    console.log("------------------------------------------------------------");
    for (let j = 0; j < sortedReport.length; j++) {
        const item = sortedReport[j];
        console.log(`${j + 1}    | ${item.name.padEnd(21)} | ${String(item.unitsSold).padEnd(10)} | ₱${item.grossRevenue.toFixed(2)}`);
    }
}

// --- TESTING THE MODULE ---
console.log("=== MODULE 3 TESTS ===");

// Generate report sorted by Gross Revenue descending
generateReportModule("2026-09-01", "2026-09-03", "grossRevenue");

// Generate report sorted by Units Sold descending
generateReportModule("2026-09-01", "2026-09-03", "unitsSold");