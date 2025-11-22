/**
 * Demo Checklist Source Files
 *
 * This module bundles all source files for the checklist demo's "Display Code" feature.
 * Using Vite's ?raw import syntax, we bundle these files at build time.
 */

// Import source files as raw strings using Vite's ?raw syntax
import checklistSource from '../components/printables/checklist/checklist.tsx?raw'
import border1Source from '../components/printables/checklist/graphic/border-1.tsx?raw'
import border2Source from '../components/printables/checklist/graphic/border-2.tsx?raw'
import border3Source from '../components/printables/checklist/graphic/border-3.tsx?raw'
import border4Source from '../components/printables/checklist/graphic/border-4.tsx?raw'
import checkIconSource from '../components/printables/checklist/graphic/check-icon.tsx?raw'
import dueDateIconSource from '../components/printables/checklist/graphic/due-date-icon.tsx?raw'
import starIconSource from '../components/printables/checklist/graphic/star-icon.tsx?raw'
import selectBorderSource from '../components/printables/selects/select-border.tsx?raw'
import selectColorSource from '../components/printables/selects/select-color.tsx?raw'
import selectSectionSource from '../components/printables/selects/select-section.tsx?raw'
import checklistDemoDataSource from '../data/checklist-demo-data.ts?raw'
import appSource from '../App.tsx?raw'

/**
 * Source file structure for code display
 */
export interface SourceFile {
  path: string
  name: string
  content: string
}

/**
 * All source files for the checklist demo, bundled at build time.
 * These are displayed in the "Display Code" modal.
 */
export const demoSourceFiles: SourceFile[] = [
  {
    path: 'src/App.tsx',
    name: 'App.tsx',
    content: appSource,
  },
  {
    path: 'src/components/printables/checklist/checklist.tsx',
    name: 'checklist.tsx',
    content: checklistSource,
  },
  {
    path: 'src/components/printables/checklist/graphic/due-date-icon.tsx',
    name: 'due-date-icon.tsx',
    content: dueDateIconSource,
  },
  {
    path: 'src/components/printables/checklist/graphic/border-1.tsx',
    name: 'border-1.tsx',
    content: border1Source,
  },
  {
    path: 'src/components/printables/checklist/graphic/border-2.tsx',
    name: 'border-2.tsx',
    content: border2Source,
  },
  {
    path: 'src/components/printables/checklist/graphic/border-3.tsx',
    name: 'border-3.tsx',
    content: border3Source,
  },
  {
    path: 'src/components/printables/checklist/graphic/border-4.tsx',
    name: 'border-4.tsx',
    content: border4Source,
  },
  {
    path: 'src/components/printables/checklist/graphic/star-icon.tsx',
    name: 'star-icon.tsx',
    content: starIconSource,
  },
  {
    path: 'src/components/printables/checklist/graphic/check-icon.tsx',
    name: 'check-icon.tsx',
    content: checkIconSource,
  },
  {
    path: 'src/components/printables/selects/select-border.tsx',
    name: 'select-border.tsx',
    content: selectBorderSource,
  },
  {
    path: 'src/components/printables/selects/select-color.tsx',
    name: 'select-color.tsx',
    content: selectColorSource,
  },
  {
    path: 'src/components/printables/selects/select-section.tsx',
    name: 'select-section.tsx',
    content: selectSectionSource,
  },
  {
    path: 'src/data/checklist-demo-data.ts',
    name: 'checklist-demo-data.ts',
    content: checklistDemoDataSource,
  },
]
