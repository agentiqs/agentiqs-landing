# Testing Duplicate Headings

This page demonstrates how duplicate headings are handled with lots of content to test scrolling navigation.

## Constructor

This is the first constructor section with detailed explanations.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```python
class FirstConstructor:
    def __init__(self, name: str):
        self.name = name
        self.initialized = True
```

### Methods

Some methods for the first class with comprehensive documentation.

The methods in this class provide various functionalities that are essential for the proper operation of the system. Each method has been carefully designed to handle specific use cases and edge conditions.

```python
def process_data(self, data: list) -> dict:
    """Process incoming data and return structured results."""
    result = {}
    for item in data:
        result[item.id] = item.value
    return result

def validate_input(self, input_data: any) -> bool:
    """Validate input data according to predefined rules."""
    if not input_data:
        return False
    return True
```

#### Helper Functions

Additional utility functions that support the main methods:

- Data transformation utilities
- Validation helpers
- Error handling mechanisms
- Logging and debugging tools

These helper functions are crucial for maintaining code quality and ensuring robust error handling throughout the application lifecycle.

## Constructor

This is the second constructor section with the same name but different content.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

```python
class SecondConstructor:
    def __init__(self, config: dict, options: list = None):
        self.config = config
        self.options = options or []
        self.status = "initialized"
```

### Methods

Some methods for the second class with different implementations.

The second class provides alternative implementations that are optimized for different use cases. These methods focus on performance and scalability, making them suitable for high-volume operations.

```python
def batch_process(self, items: list, batch_size: int = 100) -> list:
    """Process items in batches for better performance."""
    results = []
    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        processed_batch = self._process_batch(batch)
        results.extend(processed_batch)
    return results

def async_operation(self, callback: callable) -> None:
    """Perform asynchronous operations with callback."""
    # Implementation for async processing
    pass
```

#### Advanced Features

The second constructor class includes several advanced features:

1. **Batch Processing**: Efficient handling of large datasets
2. **Asynchronous Operations**: Non-blocking execution for better responsiveness
3. **Error Recovery**: Automatic retry mechanisms for failed operations
4. **Memory Management**: Optimized memory usage for large-scale processing

These features make this class particularly well-suited for enterprise applications that require high performance and reliability.

## Constructor

And a third constructor section with even more detailed content.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

```python
class ThirdConstructor:
    def __init__(self, 
                 name: str, 
                 version: str = "1.0.0",
                 dependencies: list = None,
                 configuration: dict = None):
        self.name = name
        self.version = version
        self.dependencies = dependencies or []
        self.configuration = configuration or {}
        self._initialize_components()
    
    def _initialize_components(self):
        """Initialize all required components."""
        self.logger = self._setup_logging()
        self.cache = self._setup_cache()
        self.metrics = self._setup_metrics()
```

### Methods

More methods for the third class with comprehensive error handling.

The third class represents the most advanced implementation in our series, incorporating lessons learned from the previous versions and adding sophisticated error handling, monitoring, and performance optimization features.

```python
def execute_with_retry(self, operation: callable, max_retries: int = 3) -> any:
    """Execute operation with automatic retry on failure."""
    for attempt in range(max_retries):
        try:
            return operation()
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            self.logger.warning(f"Attempt {attempt + 1} failed: {e}")
            time.sleep(2 ** attempt)  # Exponential backoff

def monitor_performance(self, func: callable):
    """Decorator for monitoring function performance."""
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            self.metrics.record_success(func.__name__, time.time() - start_time)
            return result
        except Exception as e:
            self.metrics.record_failure(func.__name__, str(e))
            raise
    return wrapper
```

#### Enterprise Features

This constructor includes enterprise-grade features:

- **Comprehensive Logging**: Detailed logging with configurable levels
- **Performance Monitoring**: Real-time performance metrics and alerting
- **Health Checks**: Automated system health monitoring
- **Configuration Management**: Dynamic configuration updates
- **Security Features**: Built-in security measures and audit trails

These features ensure that the system meets enterprise requirements for reliability, security, and maintainability.

## Configuration

A different section name with extensive configuration options.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

```yaml
# Configuration example
application:
  name: "AgentIQS Documentation System"
  version: "2.0.0"
  environment: "production"
  
database:
  host: "localhost"
  port: 5432
  name: "agentiqs_docs"
  ssl: true
  
cache:
  provider: "redis"
  ttl: 3600
  max_size: "100MB"
  
logging:
  level: "INFO"
  format: "json"
  rotation: "daily"
```

### Constructor

Even nested constructors work with proper ID generation.

This nested constructor demonstrates how the ID generation system handles hierarchical content structure while maintaining unique identifiers for each heading level.

```python
class ConfigurationManager:
    def __init__(self, config_file: str = None):
        self.config_file = config_file
        self.config_data = {}
        self.watchers = []
        if config_file:
            self.load_configuration()
    
    def load_configuration(self):
        """Load configuration from file."""
        try:
            with open(self.config_file, 'r') as f:
                if self.config_file.endswith('.yaml'):
                    import yaml
                    self.config_data = yaml.safe_load(f)
                else:
                    import json
                    self.config_data = json.load(f)
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {e}")
            self.config_data = {}
```

#### Configuration Validation

The configuration system includes comprehensive validation:

1. **Schema Validation**: Ensures configuration matches expected schema
2. **Type Checking**: Validates data types for all configuration values
3. **Range Validation**: Checks that numeric values are within acceptable ranges
4. **Dependency Validation**: Verifies that required dependencies are available

This multi-layered validation approach ensures that the system only accepts valid configurations and provides clear error messages when validation fails.

## Advanced Topics

This section covers advanced topics in documentation management.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.

### Dynamic Content Loading

The documentation system supports dynamic content loading for improved performance:

- **Lazy Loading**: Content is loaded only when needed
- **Caching**: Frequently accessed content is cached for faster access
- **Prefetching**: Anticipatory loading of likely-to-be-accessed content
- **Progressive Enhancement**: Basic functionality works even with JavaScript disabled

These features ensure that the documentation system remains fast and responsive even with large amounts of content.

### Search and Navigation

Advanced search and navigation features include:

```typescript
interface SearchOptions {
  query: string;
  sections?: string[];
  exactMatch?: boolean;
  fuzzySearch?: boolean;
  maxResults?: number;
}

class DocumentationSearch {
  private index: SearchIndex;
  
  constructor(documents: Document[]) {
    this.index = this.buildSearchIndex(documents);
  }
  
  search(options: SearchOptions): SearchResult[] {
    // Implementation of search functionality
    return this.index.search(options);
  }
}
```

## Summary

All headings should have unique IDs even when they have the same text content.

This comprehensive test page demonstrates that the documentation system can handle:

1. **Multiple duplicate headings** at the same level
2. **Nested duplicate headings** at different levels
3. **Long content sections** that require scrolling
4. **Complex navigation scenarios** with many sections
5. **Table of contents generation** with unique anchor links

The unique ID generation ensures that each heading can be individually referenced and navigated to, regardless of whether there are other headings with the same text content elsewhere in the document.

### Final Test Section

This final section contains additional content to ensure we have enough material for thorough testing of the navigation and scrolling functionality.

The documentation system has been designed with scalability and usability in mind, ensuring that it can handle documents of any size while maintaining excellent performance and user experience.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

#### Code Examples

Here are some final code examples to round out the content:

```python
def test_duplicate_handling():
    """Test that duplicate headings generate unique IDs."""
    content = """
    # Constructor
    First constructor
    
    # Constructor  
    Second constructor
    """
    
    toc = generateTableOfContents(content)
    ids = [item.id for item in toc]
    
    assert len(set(ids)) == len(ids), "All IDs should be unique"
    assert "constructor" in ids[0]
    assert "constructor-1" in ids[1]
    
    print("All tests passed!")

if __name__ == "__main__":
    test_duplicate_handling()
```

This extended content should provide plenty of material for testing the navigation and scrolling functionality!
