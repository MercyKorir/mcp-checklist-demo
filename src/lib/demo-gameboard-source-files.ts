/**
 * Demo Game Board Source Files
 *
 * This module bundles all source files for the game board demo's "Display Code" feature.
 * Using Vite's ?raw import syntax, we bundle these files at build time.
 */

// Import main component files
import gameboardSource from '../components/printables/gameboard/gameboard.tsx?raw'
import arrowSource from '../components/printables/gameboard/arrow.tsx?raw'
import workstyleIconSource from '../components/printables/gameboard/workstyle-icon.tsx?raw'

// Import workstyle icon files
import userIconSource from '../components/printables/gameboard/workstyle-icons/user.tsx?raw'
import usersIconSource from '../components/printables/gameboard/workstyle-icons/users.tsx?raw'

// Import graphic files - Nature
import nature1Source from '../components/printables/gameboard/graphic/nature-1.tsx?raw'
import nature2Source from '../components/printables/gameboard/graphic/nature-2.tsx?raw'
import nature3Source from '../components/printables/gameboard/graphic/nature-3.tsx?raw'
import nature4Source from '../components/printables/gameboard/graphic/nature-4.tsx?raw'
import nature5Source from '../components/printables/gameboard/graphic/nature-5.tsx?raw'
import nature6Source from '../components/printables/gameboard/graphic/nature-6.tsx?raw'
import nature7Source from '../components/printables/gameboard/graphic/nature-7.tsx?raw'
import nature8Source from '../components/printables/gameboard/graphic/nature-8.tsx?raw'

// Import graphic files - School
import school1Source from '../components/printables/gameboard/graphic/school-1.tsx?raw'
import school2Source from '../components/printables/gameboard/graphic/school-2.tsx?raw'
import school3Source from '../components/printables/gameboard/graphic/school-3.tsx?raw'
import school4Source from '../components/printables/gameboard/graphic/school-4.tsx?raw'
import school5Source from '../components/printables/gameboard/graphic/school-5.tsx?raw'
import school6Source from '../components/printables/gameboard/graphic/school-6.tsx?raw'
import school7Source from '../components/printables/gameboard/graphic/school-7.tsx?raw'
import school8Source from '../components/printables/gameboard/graphic/school-8.tsx?raw'

// Import graphic files - Sports
import sports1Source from '../components/printables/gameboard/graphic/sports-1.tsx?raw'
import sports2Source from '../components/printables/gameboard/graphic/sports-2.tsx?raw'
import sports3Source from '../components/printables/gameboard/graphic/sports-3.tsx?raw'
import sports4Source from '../components/printables/gameboard/graphic/sports-4.tsx?raw'
import sports5Source from '../components/printables/gameboard/graphic/sports-5.tsx?raw'
import sports6Source from '../components/printables/gameboard/graphic/sports-6.tsx?raw'
import sports7Source from '../components/printables/gameboard/graphic/sports-7.tsx?raw'
import sports8Source from '../components/printables/gameboard/graphic/sports-8.tsx?raw'

// Import select components
import selectLessonDividerSource from '../components/printables/selects/select-lesson-divider.tsx?raw'
import selectGraphicThemeSource from '../components/printables/selects/select-graphic-theme.tsx?raw'
import selectColorSource from '../components/printables/selects/select-color.tsx?raw'

// Import hooks and constants
import useGameboardOptionsSource from '../hooks/use-gameboard-options.ts?raw'
import workstyleIconsListSource from '../const/workstyle-icons-list.ts?raw'

/**
 * Source file structure for code display
 */
export interface SourceFile {
  path: string
  name: string
  content: string
}

/**
 * All source files for the game board demo, bundled at build time.
 * These are displayed in the "Display Code" modal.
 */
export const demoGameBoardSourceFiles: SourceFile[] = [
  {
    path: 'src/components/printables/gameboard/gameboard.tsx',
    name: 'gameboard.tsx',
    content: gameboardSource,
  },
  {
    path: 'src/components/printables/gameboard/arrow.tsx',
    name: 'arrow.tsx',
    content: arrowSource,
  },
  {
    path: 'src/components/printables/gameboard/workstyle-icon.tsx',
    name: 'workstyle-icon.tsx',
    content: workstyleIconSource,
  },
  // Workstyle icons
  {
    path: 'src/components/printables/gameboard/workstyle-icons/user.tsx',
    name: 'user.tsx',
    content: userIconSource,
  },
  {
    path: 'src/components/printables/gameboard/workstyle-icons/users.tsx',
    name: 'users.tsx',
    content: usersIconSource,
  },
  // Nature graphics
  {
    path: 'src/components/printables/gameboard/graphic/nature-1.tsx',
    name: 'nature-1.tsx',
    content: nature1Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-2.tsx',
    name: 'nature-2.tsx',
    content: nature2Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-3.tsx',
    name: 'nature-3.tsx',
    content: nature3Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-4.tsx',
    name: 'nature-4.tsx',
    content: nature4Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-5.tsx',
    name: 'nature-5.tsx',
    content: nature5Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-6.tsx',
    name: 'nature-6.tsx',
    content: nature6Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-7.tsx',
    name: 'nature-7.tsx',
    content: nature7Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/nature-8.tsx',
    name: 'nature-8.tsx',
    content: nature8Source,
  },
  // School graphics
  {
    path: 'src/components/printables/gameboard/graphic/school-1.tsx',
    name: 'school-1.tsx',
    content: school1Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-2.tsx',
    name: 'school-2.tsx',
    content: school2Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-3.tsx',
    name: 'school-3.tsx',
    content: school3Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-4.tsx',
    name: 'school-4.tsx',
    content: school4Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-5.tsx',
    name: 'school-5.tsx',
    content: school5Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-6.tsx',
    name: 'school-6.tsx',
    content: school6Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-7.tsx',
    name: 'school-7.tsx',
    content: school7Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/school-8.tsx',
    name: 'school-8.tsx',
    content: school8Source,
  },
  // Sports graphics
  {
    path: 'src/components/printables/gameboard/graphic/sports-1.tsx',
    name: 'sports-1.tsx',
    content: sports1Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-2.tsx',
    name: 'sports-2.tsx',
    content: sports2Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-3.tsx',
    name: 'sports-3.tsx',
    content: sports3Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-4.tsx',
    name: 'sports-4.tsx',
    content: sports4Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-5.tsx',
    name: 'sports-5.tsx',
    content: sports5Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-6.tsx',
    name: 'sports-6.tsx',
    content: sports6Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-7.tsx',
    name: 'sports-7.tsx',
    content: sports7Source,
  },
  {
    path: 'src/components/printables/gameboard/graphic/sports-8.tsx',
    name: 'sports-8.tsx',
    content: sports8Source,
  },
  // Select components
  {
    path: 'src/components/printables/selects/select-lesson-divider.tsx',
    name: 'select-lesson-divider.tsx',
    content: selectLessonDividerSource,
  },
  {
    path: 'src/components/printables/selects/select-graphic-theme.tsx',
    name: 'select-graphic-theme.tsx',
    content: selectGraphicThemeSource,
  },
  {
    path: 'src/components/printables/selects/select-color.tsx',
    name: 'select-color.tsx',
    content: selectColorSource,
  },
  // Hooks
  {
    path: 'src/hooks/use-gameboard-options.ts',
    name: 'use-gameboard-options.ts',
    content: useGameboardOptionsSource,
  },
  // Constants
  {
    path: 'src/const/workstyle-icons-list.ts',
    name: 'workstyle-icons-list.ts',
    content: workstyleIconsListSource,
  },
]
