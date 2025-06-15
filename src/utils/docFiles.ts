// Generated documentation index - this file imports all documentation content
import readme_md from '../docs/README.md?raw';
import config_yaml from '../docs/config.yaml?raw';
import sections_concepts_intro_md from '../docs/sections/concepts/intro.md?raw';
import sections_getting_started_quickstart_md from '../docs/sections/getting-started/quickstart.md?raw';
import sections_getting_started_test_duplicates_md from '../docs/sections/getting-started/test-duplicates.md?raw';
import sections_python_sdk_classes_md from '../docs/sections/python-sdk/classes.md?raw';
import sections_python_sdk_index_md from '../docs/sections/python-sdk/index.md?raw';

export const docFiles = {
  'README.md': readme_md,
  'config.yaml': config_yaml,
  'sections/concepts/intro.md': sections_concepts_intro_md,
  'sections/getting-started/quickstart.md': sections_getting_started_quickstart_md,
  'sections/getting-started/test-duplicates.md': sections_getting_started_test_duplicates_md,
  'sections/python-sdk/classes.md': sections_python_sdk_classes_md,
  'sections/python-sdk/index.md': sections_python_sdk_index_md,
} as const;

export type DocFilePath = keyof typeof docFiles;