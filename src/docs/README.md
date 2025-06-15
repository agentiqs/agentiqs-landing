# Documentation System

This directory contains the documentation content and configuration for the AgentIQS website.

## Structure

```
src/docs/
├── config.yaml          # Main configuration file
└── sections/            # Documentation sections
    ├── concepts/        # Core concepts documentation
    │   └── intro.md
    └── python-sdk/      # Python SDK documentation
        ├── index.md
        └── classes.md
```

## Configuration

The `config.yaml` file controls the structure and appearance of the documentation:

- **sections**: Define the main sections of documentation
- **navigation**: Control navigation behavior (numbering, collapsible sections)
- **theme**: Configure appearance (syntax highlighting, table of contents)

### Adding New Sections

1. Create a new folder under `sections/`
2. Add your markdown files
3. Update `config.yaml` to include the new section:

```yaml
sections:
  - id: "new-section"
    title: "New Section"
    description: "Description of the new section"
    pages:
      - id: "page1"
        title: "First Page"
        file: "sections/new-section/page1.md"
```

4. Run `npm run docs:generate` to update the file index

### Adding New Pages

1. Create your markdown file in the appropriate section folder
2. Add the page to the section's `pages` array in `config.yaml`
3. Run `npm run docs:generate` to update the file index

## Features

- **Automatic Navigation**: Sidebar navigation is generated from the config
- **Simple Ordering**: Sections and pages are ordered by their position in the config arrays
- **Table of Contents**: Auto-generated TOC for each page
- **Breadcrumbs**: Shows current location in the documentation
- **Previous/Next Navigation**: Easy navigation between pages
- **Mobile-Friendly**: Responsive design with mobile navigation
- **Syntax Highlighting**: Code blocks are syntax highlighted
- **Search-Friendly**: Clean URLs and good SEO structure

## Markdown Features

The system supports:

- GitHub Flavored Markdown (GFM)
- Syntax highlighting for code blocks
- Tables, lists, links, images
- Automatic heading IDs for deep linking
- Typography styling with Tailwind typography

## Usage

After adding or modifying documentation:

1. **Add new files**: Run `npm run docs:generate` to update the file index
2. **Update config**: Modify `config.yaml` to change structure or settings
3. **Access docs**: Visit `/docs` on your website

The documentation page will automatically redirect to the first page if no specific page is requested.

## Development

The documentation system is built with:

- **React Markdown**: For rendering markdown content
- **YAML**: For configuration parsing
- **React Router**: For navigation
- **Tailwind CSS**: For styling
- **Highlight.js**: For syntax highlighting

Files are bundled at build time for optimal performance.
