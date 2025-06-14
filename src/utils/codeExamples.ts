
// Import the raw text content of Python files
import basicSetupCode from '../examples/basic_setup.py?raw';
import advancedMockingCode from '../examples/advanced_mocking.py?raw';
import testingFrameworkCode from '../examples/testing_framework.py?raw';

export const codeExamples = {
  basic: {
    title: "basic_setup.py",
    code: basicSetupCode
  },
  advanced: {
    title: "advanced_mocking.py", 
    code: advancedMockingCode
  },
  testing: {
    title: "testing_framework.py",
    code: testingFrameworkCode
  }
};
