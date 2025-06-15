# Getting Started

Welcome to AgentIQS! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, make sure you have:

- Python 3.8 or higher
- An AgentIQS account (sign up at [agentiqs.com](https://agentiqs.com))
- Your API key from the dashboard

## Step 1: Installation

Install the AgentIQS Python SDK:

```bash
pip install agentiqs
```

## Step 2: Authentication

Set up your API key:

```bash
export AGENTIQS_API_KEY="your-api-key-here"
```

Or create a configuration file:

```json
{
  "api_key": "your-api-key-here",
  "base_url": "https://api.agentiqs.com"
}
```

## Step 3: Create Your First Agent

```python
from agentiqs import Agent

# Create a simple agent
agent = Agent(
    name="hello_world",
    description="My first AgentIQS agent"
)

@agent.task
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to AgentIQS."

# Test the agent
result = agent.execute("greet", name="World")
print(result)
```

## Step 4: Deploy Your Agent

```python
# Deploy to AgentIQS cloud
deployment = agent.deploy(
    environment="production",
    scaling="auto"
)

print(f"Agent deployed at: {deployment.url}")
```

## Next Steps

Now that you have your first agent running, explore these topics:

- [Core Concepts](../concepts/intro) - Learn the fundamentals
- [Python SDK](../python-sdk/index) - Dive deeper into the SDK
- [API Reference](../python-sdk/classes) - Complete class documentation

## Need Help?

- 📖 [Documentation](/)
- 💬 [Community Forum](https://community.agentiqs.com)
- 📧 [Support](mailto:support@agentiqs.com)
- 🐛 [Report Issues](https://github.com/agentiqs/issues)
