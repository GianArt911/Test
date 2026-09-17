// MODULE 1: SEARCH MODULE
// Algorithms: Linear Search (for Name) & Binary Search (for ID)

// Mock Data: Numerical IDs MUST be sorted for Binary Search to work
const inventoryList = [
    { id: 101, name: "Classic Milk Tea", price: 120.00 },
    { id: 105, name: "Taro Milk Tea", price: 130.00 },
    { id: 108, name: "Matcha Latte", price: 135.00 },
    { id: 112, name: "Oolong Milk Tea", price: 125.00 },
    { id: 202, name: "Brown Sugar Boba", price: 140.00 },
    { id: 205, name: "Wintermelon Boba", price: 130.00 },
    { id: 210, name: "Thai Milk Tea", price: 125.00 },
    { id: 304, name: "Cheese Fries", price: 85.00 },
    { id: 308, name: "Barbecue Fries", price: 85.00 },
    { id: 310, name: "Tapioca Pearls", price: 20.00 },
    { id: 315, name: "Egg Pudding", price: 25.00 },
    { id: 401, name: "Chicken Poppers", price: 110.00 },
    { id: 405, name: "Fish Balls", price: 65.00 },
    { id: 501, name: "Mango Fruit Tea", price: 115.00 },
    { id: 505, name: "Passion Fruit Tea", price: 115.00 }
];

// Linear Search Algorithm: Manual array insertion instead of .push()
function linearSearchByName(list, query) {
    const results = [];
    let resultsCount = 0;
    const searchTerm = query.toLowerCase();
    
    for (let i = 0; i < list.length; i++) {
        if (list[i].name.toLowerCase().indexOf(searchTerm) !== -1) {
            results[resultsCount] = list[i]; // Manual insertion
            resultsCount = resultsCount + 1;
        }
    }
    return results;
}

// Binary Search Algorithm: Fast O(log N) lookup for sorted numeric IDs
function binarySearchById(sortedList, targetId) {
    let low = 0;
    let high = sortedList.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (sortedList[mid].id === targetId) {
            return [sortedList[mid]]; // Return array for consistent output
        } else if (sortedList[mid].id < targetId) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }
    return []; // Return empty array if not found
}

// Main Search Processor: Checks input type and delegates search method
function searchModule(inputQuery) {
    const isNumericId = !isNaN(inputQuery) && !isNaN(parseFloat(inputQuery));

    if (isNumericId) {
        console.log(`[Search Module] Executing Binary Search for ID: ${inputQuery}`);
        return binarySearchById(inventoryList, parseInt(inputQuery));
    } else {
        console.log(`[Search Module] Executing Linear Search for Name: "${inputQuery}"`);
        return linearSearchByName(inventoryList, inputQuery);
    }
}

// --- TESTING THE MODULE ---
console.log("=== MODULE 1 TESTS ===");

// Test Binary Search via Numeric ID
const searchResult1 = searchModule("202");
console.log("Result:", searchResult1);

// Test Linear Search via String Name
const searchResult2 = searchModule("Tea");
console.log("Result:", searchResult2);