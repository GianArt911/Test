// MODULE 2: STOCK / SUPPLY MODULE
// Data Structure: Queue (FIFO - First-In, First-Out) using Pointer Indices

class SupplyBatch {
    constructor(batchId, ingredientCode, quantity, expirationDate, supplierName) {
        this.batchId = batchId;
        this.ingredientCode = ingredientCode;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
        this.supplierName = supplierName;
    }
}

class SupplyQueue {
    constructor(capacity = 50) {
        this.capacity = capacity;
        this.items = new Array(capacity); // Fixed array allocation
        this.front = 0;                   // Pointer to the front (oldest item)
        this.rear = -1;                   // Pointer to the rear (newest item)
        this.size = 0;                    // Tracks active number of items
    }

    // Manual Enqueue: Put item at rear pointer index (No .push())
    enqueue(batch) {
        if (this.size === this.capacity) {
            console.log("[Supply Queue] Warning: Queue capacity is full!");
            return false;
        }
        this.rear = this.rear + 1;
        this.items[this.rear] = batch;
        this.size = this.size + 1;
        console.log(`[Supply Queue] Enqueued: Batch ${batch.batchId} (${batch.quantity} units of ${batch.ingredientCode})`);
        return true;
    }

    // Manual Dequeue: Extract item from front pointer index (No .shift())
    dequeue() {
        if (this.isEmpty()) {
            console.log("[Supply Queue] Warning: Queue is empty! No stock available.");
            return null;
        }
        const oldestBatch = this.items[this.front];
        this.items[this.front] = null; // Clear memory location
        this.front = this.front + 1;    // Advance front pointer
        this.size = this.size - 1;
        console.log(`[Supply Queue] Dequeued: Using oldest Batch ${oldestBatch.batchId} (Code: ${oldestBatch.ingredientCode} | Exp: ${oldestBatch.expirationDate})`);
        return oldestBatch;
    }

    isEmpty() {
        return this.size === 0;
    }

    // Display current queue state using manual traversal
    displayQueue() {
        console.log("\n--- Active Stock Batches (FIFO Order) ---");
        if (this.isEmpty()) {
            console.log("No batches remaining.");
            return;
        }

        let displayIndex = 1;
        for (let i = this.front; i <= this.rear; i++) {
            const batch = this.items[i];
            const positionTag = (i === this.front) ? "[FRONT - USE FIRST]" : `[POSITION ${displayIndex}]`;
            console.log(`${positionTag} Batch: ${batch.batchId} | Code: ${batch.ingredientCode} | Qty: ${batch.quantity} | Exp: ${batch.expirationDate} | Supplier: ${batch.supplierName}`);
            displayIndex = displayIndex + 1;
        }
    }
}

// --- TESTING THE MODULE WITH EXPANDED DATASET ---
console.log("=== MODULE 2 TESTS ===");

const milkQueue = new SupplyQueue(50);

// Populate Queue with 8 Incoming Deliveries (Enqueue)
milkQueue.enqueue(new SupplyBatch("BATCH-001", "ING-MILK", 10, "2026-09-05", "Dairy Co."));
milkQueue.enqueue(new SupplyBatch("BATCH-002", "ING-MILK", 20, "2026-09-10", "Dairy Co."));
milkQueue.enqueue(new SupplyBatch("BATCH-003", "ING-BOBA", 50, "2026-09-12", "Boba Master"));
milkQueue.enqueue(new SupplyBatch("BATCH-004", "ING-TARO", 15, "2026-09-15", "Flavor Tech"));
milkQueue.enqueue(new SupplyBatch("BATCH-005", "ING-POTATO", 40, "2026-09-20", "Snack Supply Ltd."));
milkQueue.enqueue(new SupplyBatch("BATCH-006", "ING-MILK", 25, "2026-09-22", "Dairy Co."));
milkQueue.enqueue(new SupplyBatch("BATCH-007", "ING-PEARL", 100, "2026-09-25", "Boba Master"));
milkQueue.enqueue(new SupplyBatch("BATCH-008", "ING-CHEESE", 30, "2026-09-28", "Dairy Co."));

// Display active batches
milkQueue.displayQueue();

// Staff dequeues 2 batches (FIFO: BATCH-001 and BATCH-002 should be processed first)
console.log("\n--- Staff Requesting Stock (2 Operations) ---");
milkQueue.dequeue();
milkQueue.dequeue();

// View queue state after dequeuing
milkQueue.displayQueue();