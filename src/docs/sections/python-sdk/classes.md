# API Reference

Complete reference for all Python SDK classes and methods.

## Agent Class

The main class for creating and managing AI agents.

### Constructor

```python
Agent(config: Config = None, **kwargs)
```

**Parameters:**
- `config` (Config, optional): Configuration object for the agent
- `**kwargs`: Additional configuration parameters

**Example:**
```python
from agentiqs import Agent, Config

config = Config(name="my_agent", api_key="your-key")
agent = Agent(config)

# Or using kwargs
agent = Agent(name="my_agent", api_key="your-key")
```

### Methods

#### execute()

Execute a task or workflow.

```python
execute(task: str | callable, **kwargs) -> Any
```

**Parameters:**
- `task`: Task name or callable function to execute
- `**kwargs`: Arguments to pass to the task

**Returns:**
- Result of the task execution

**Example:**
```python
result = agent.execute("process_data", data=input_data)
```

#### add_skill()

Add a skill to the agent.

```python
add_skill(skill: Skill) -> None
```

**Parameters:**
- `skill`: Skill instance to add

**Example:**
```python
from agentiqs.skills import WebSearchSkill

agent.add_skill(WebSearchSkill())
```

#### task()

Decorator for registering tasks with the agent.

```python
@agent.task
def my_task(param1: str, param2: int) -> str:
    return f"Processed {param1} with {param2}"
```

## Config Class

Configuration class for agent settings.

### Constructor

```python
Config(
    name: str = None,
    description: str = None,
    api_key: str = None,
    base_url: str = "https://api.agentiqs.com",
    model: str = "gpt-4",
    max_tokens: int = 1000,
    temperature: float = 0.7,
    timeout: int = 30,
    log_level: str = "INFO"
)
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | str | None | Agent name |
| `description` | str | None | Agent description |
| `api_key` | str | None | API authentication key |
| `base_url` | str | "https://api.agentiqs.com" | Base API URL |
| `model` | str | "gpt-4" | AI model to use |
| `max_tokens` | int | 1000 | Maximum tokens per request |
| `temperature` | float | 0.7 | Model temperature (0.0-1.0) |
| `timeout` | int | 30 | Request timeout in seconds |
| `log_level` | str | "INFO" | Logging level |

## Skill Class

Base class for creating reusable agent capabilities.

### Constructor

```python
Skill(name: str = None, description: str = None)
```

### Methods

#### register()

Register the skill with an agent.

```python
register(agent: Agent) -> None
```

### Example Implementation

```python
from agentiqs import Skill

class CalculatorSkill(Skill):
    def __init__(self):
        super().__init__(name="calculator", description="Basic math operations")
    
    def add(self, a: float, b: float) -> float:
        """Add two numbers."""
        return a + b
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        return a * b
```

## Workflow Class

Class for creating complex multi-step processes.

### Constructor

```python
Workflow(name: str, description: str = None)
```

### Methods

#### add_step()

Add a step to the workflow.

```python
add_step(step: Step) -> None
```

#### execute()

Execute the workflow.

```python
execute(input_data: Any = None) -> Any
```

### Example

```python
from agentiqs import Workflow, Step

def extract_data(data):
    # Extract logic
    return extracted_data

def transform_data(data):
    # Transform logic
    return transformed_data

workflow = Workflow("etl_process")
workflow.add_step(Step("extract", extract_data))
workflow.add_step(Step("transform", transform_data))

result = workflow.execute(raw_data)
```

## Step Class

Represents a single step in a workflow.

### Constructor

```python
Step(
    name: str,
    function: callable,
    condition: callable = None,
    retry_count: int = 0,
    timeout: int = None
)
```

**Parameters:**
- `name`: Step name
- `function`: Function to execute
- `condition`: Optional condition function
- `retry_count`: Number of retries on failure
- `timeout`: Step timeout in seconds

## Exception Classes

### AgentIQSError

Base exception class for all AgentIQS errors.

```python
class AgentIQSError(Exception):
    pass
```

### AuthenticationError

Raised when authentication fails.

```python
class AuthenticationError(AgentIQSError):
    pass
```

### ValidationError

Raised when input validation fails.

```python
class ValidationError(AgentIQSError):
    pass
```

### ExecutionError

Raised when task execution fails.

```python
class ExecutionError(AgentIQSError):
    pass
```

## Utility Functions

### authenticate()

Authenticate with the AgentIQS API.

```python
authenticate(api_key: str = None, config_file: str = None) -> bool
```

### get_version()

Get the SDK version.

```python
get_version() -> str
```

### set_log_level()

Set the logging level.

```python
set_log_level(level: str) -> None
```

**Parameters:**
- `level`: One of "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"
