
// Import the raw text content of Python files
import basicSetupCode from "../examples/basic_setup.py?raw";
import basicSetupConfig from "../examples/basic_config.yaml?raw";
import basicSetupEnv from "../examples/basic_env.env?raw";

export const codeExamples = {
  main: {
    title: "main.py",
    code: basicSetupCode,
    language: "python",
  },
  config: {
    title: "proxy_config.yaml",
    code: basicSetupConfig,
    language: "yaml",
  },
  env: {
    title: ".env",
    code: basicSetupEnv,
    language: "bash",
  },
};
