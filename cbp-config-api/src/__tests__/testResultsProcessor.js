module.exports = function (results) {
  // Create a copy of the results to avoid modifying the original
  const processedResults = JSON.parse(JSON.stringify(results));

  // Initialize counters for the entire test run
  let totalFailedTests = 0;
  let totalPassedTests = 0;
  let totalTodoTests = 0;
  let totalPendingTests = 0;

  // Process test results
  if (processedResults.testResults) {
    processedResults.testResults.forEach(testResult => {
      console.log('\nProcessing test suite:', testResult.testFilePath);
      
      if (testResult.testResults) {
        // Reset counters for this test suite
        testResult.numFailingTests = 0;
        testResult.numPassingTests = 0;
        testResult.numTodoTests = 0;
        testResult.numPendingTests = 0;

        testResult.testResults.forEach(test => {
          // Always log test details for debugging
          console.log('\nProcessing test:', {
            title: test.title,
            status: test.status,
            todo: test.todo,
            failureMessages: test.failureMessages?.length || 0,
            failureDetails: test.failureMessages || [],
            assertionResults: test.assertionResults?.map(a => ({
              status: a.status,
              title: a.title,
              failureMessages: a.failureMessages
            })) || []
          });

          // A test can fail in multiple ways:
          // 1. Has failure messages in the test
          const hasFailureMessages = test.failureMessages?.length > 0;
          
          // 2. Status is explicitly 'failed'
          const isExplicitlyFailed = test.status === 'failed';
          
          // 3. Has assertion failures
          let hasAssertionFailures = false;
          if (test.assertionResults?.length > 0) {
            hasAssertionFailures = test.assertionResults.some(assertion => {
              const failed = assertion.status === 'failed' || assertion.failureMessages?.length > 0;
              if (failed) {
                console.log('Failed assertion:', {
                  title: assertion.title,
                  status: assertion.status,
                  failureMessages: assertion.failureMessages
                });
              }
              return failed;
            });
          }

          // 4. Has a failure message in any assertion
          const hasAssertionFailureMessages = test.assertionResults?.some(
            assertion => assertion.failureMessages?.length > 0
          ) || false;

          // 5. Check for status code mismatches in error messages
          const hasStatusCodeMismatch = test.failureMessages?.some(msg => 
            msg.includes('expect(received).toBe(expected)') && 
            msg.includes('Expected:') && 
            msg.includes('Received:')
          ) || false;

          const isFailing = hasFailureMessages || isExplicitlyFailed || hasAssertionFailures || 
                          hasAssertionFailureMessages || hasStatusCodeMismatch;
          const isTodo = test.todo === true || test.status === 'todo';
          const isPending = test.status === 'pending' || test.status === 'skipped';

          // If it's failing, log all the reasons why
          if (isFailing) {
            console.log('Test failed due to:', {
              hasFailureMessages,
              isExplicitlyFailed,
              hasAssertionFailures,
              hasAssertionFailureMessages,
              hasStatusCodeMismatch,
              failureMessages: test.failureMessages,
              assertionFailures: test.assertionResults?.filter(a => a.status === 'failed' || a.failureMessages?.length > 0)
            });
          }

          // Count the test in only one category, prioritizing failures over todo
          if (isFailing) {
            testResult.numFailingTests++;
            totalFailedTests++;
            console.log('Counted as FAILED:', test.title);
          } else if (isTodo) {
            testResult.numTodoTests++;
            totalTodoTests++;
            console.log('Counted as TODO:', test.title);
          } else if (isPending) {
            testResult.numPendingTests++;
            totalPendingTests++;
            console.log('Counted as PENDING:', test.title);
          } else if (test.status === 'passed') {
            testResult.numPassingTests++;
            totalPassedTests++;
            console.log('Counted as PASSED:', test.title);
          }
        });
      }
    });
  }

  // Calculate total tests
  const totalTests = totalFailedTests + totalPassedTests + totalTodoTests + totalPendingTests;

  // Update the overall test results
  processedResults.numFailedTests = totalFailedTests;
  processedResults.numPassedTests = totalPassedTests;
  processedResults.numTodoTests = totalTodoTests;
  processedResults.numPendingTests = totalPendingTests;
  processedResults.numTotalTests = totalTests;
  processedResults.success = totalFailedTests === 0;

  // Log the final counts
  console.log('\n=== FINAL TEST COUNTS ===');
  console.log('✅ Passed:', totalPassedTests);
  console.log('❌ Failed:', totalFailedTests);
  console.log('📝 Todo:', totalTodoTests);
  console.log('⏸️  Pending:', totalPendingTests);
  console.log('📊 Total:', totalTests);
  console.log('======================\n');

  return processedResults;
};
