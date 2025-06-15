# Python SDK

The AgentIQS Python SDK provides a comprehensive set of tools for building and managing AI agents in Python applications.

## Installation

Install the AgentIQS Python SDK using pip:

```bash
pip install agentiqs
```

Or using poetry:

```bash
poetry add agentiqs
```

## Quick Start

Here's a simple example to get you started:

```python
from agentiqs import Agent, Config

# Create an agent configuration
config = Config(
    name="my_first_agent",
    description="A simple demonstration agent",
    api_key="your-api-key"
)

# Initialize the agent
agent = Agent(config)

# Define a simple task
@agent.task
def greet_user(name: str) -> str:
    return f"Hello, {name}! Welcome to AgentIQS."

# Execute the task
result = agent.execute("greet_user", name="Alice")
print(result)  # Output: Hello, Alice! Welcome to AgentIQS.
```

## Authentication

Before using the SDK, you need to authenticate with your AgentIQS API key:

```python
from agentiqs import authenticate

# Method 1: Direct authentication
authenticate("your-api-key")

# Method 2: Environment variable
# Set AGENTIQS_API_KEY environment variable
authenticate()

# Method 3: Configuration file
authenticate(config_file="~/.agentiqs/config.json")
```

## Core Classes

The Python SDK provides several core classes:

### Agent

The main class for creating and managing agents:

```python
from agentiqs import Agent

agent = Agent(
    name="customer_service",
    description="Customer service agent",
    max_tokens=1000,
    temperature=0.7
)
```

### Skill

Base class for creating reusable agent capabilities:

```python
from agentiqs import Skill

class DatabaseSkill(Skill):
    def query(self, sql: str) -> list:
        # Your database logic here
        pass
    
    def insert(self, table: str, data: dict) -> bool:
        # Your insert logic here
        pass
```

### Workflow

For creating complex multi-step processes:

```python
from agentiqs import Workflow, Step

workflow = Workflow("data_processing")

workflow.add_step(Step("extract", extract_data))
workflow.add_step(Step("transform", transform_data))
workflow.add_step(Step("load", load_data))

result = workflow.execute(input_data)
```

## Configuration

The SDK supports various configuration options:

```python
from agentiqs import Config

config = Config(
    # Agent settings
    name="my_agent",
    description="Agent description",
    
    # API settings
    api_key="your-key",
    base_url="https://api.agentiqs.com",
    timeout=30,
    
    # Model settings
    model="gpt-4",
    max_tokens=2000,
    temperature=0.5,
    
    # Logging
    log_level="INFO",
    log_file="agent.log"
)
```

## Error Handling

The SDK provides comprehensive error handling:

```python
from agentiqs import Agent, AgentIQSError, AuthenticationError

try:
    agent = Agent(config)
    result = agent.execute(task)
except AuthenticationError:
    print("Invalid API key or authentication failed")
except AgentIQSError as e:
    print(f"AgentIQS error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Next Steps

- Learn about [API Reference](classes) for detailed class documentation
- Explore advanced features in our examples
- Check out the [Python SDK GitHub repository](https://github.com/agentiqs/python-sdk) for more examples
