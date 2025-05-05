
//copy right peacedeveloper@gmail.com 

// Performance Benchmark for Comparison Operations
function runComparisonBenchmark() {
    // Test configurations
    const testSize = 10000000; // Number of comparisons to perform
    const warmupRounds = 3;   // Warmup rounds to let JIT optimize
    const testRounds = 10;     // Actual test rounds
    
    // Generate test data
    const intPairs = Array.from({length: testSize}, () => {
        const a = Math.floor(Math.random() * 1000);
        const b = Math.floor(Math.random() * 1000);
        return [a, b];
    });
    
    const floatPairs = Array.from({length: testSize}, () => {
        const a = Math.random() * 1000;
        const b = Math.random() * 1000;
        return [a, b];
    });
    
    const stringPairs = Array.from({length: testSize}, () => {
        const a = Math.floor(Math.random() * 1000).toString();
        const b = Math.floor(Math.random() * 1000).toString();
        return [a, b];
    });
    
    // Benchmark function
    function benchmark(name, pairs, compareFn) {
        // Warmup
        for (let i = 0; i < warmupRounds; i++) {
            for (const [a, b] of pairs) {
                compareFn(a, b);
            }
        }
        
        // Actual test
        const times = [];
        for (let i = 0; i < testRounds; i++) {
            const start = performance.now();
            for (const [a, b] of pairs) {
                compareFn(a, b);
            }
            const end = performance.now();
            times.push(end - start);
        }
        
        // Calculate statistics
        const avg = times.reduce((sum, t) => sum + t, 0) / testRounds;
        const min = Math.min(...times);
        const max = Math.max(...times);
        
        return {
            name,
            avg,
            min,
            max,
            'ops/ms': testSize / avg
        };
    }
    
    // Run benchmarks
    const intResults = benchmark(
        'Integer Comparison', 
        intPairs, 
        (a, b) => a < b
    );
    
    const floatResults = benchmark(
        'Float Comparison', 
        floatPairs, 
        (a, b) => a < b
    );
    
    const stringResults = benchmark(
        'String Comparison', 
        stringPairs, 
        (a, b) => a < b
    );
    
    // Display results
    console.log('Comparison Performance Benchmark Results:');
    console.log(`Test size: ${testSize.toLocaleString()} comparisons per test`);
    console.log(`Warmup rounds: ${warmupRounds}, Test rounds: ${testRounds}`);
    console.table([intResults, floatResults, stringResults]);
}

// Run the benchmark
runComparisonBenchmark();