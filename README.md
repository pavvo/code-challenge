# Software Sauna Code Challenge



### Features
- Follows paths starting from '@' and ending at 'x'
- Collects letters (A-Z) along the path
- Handles turns at '+' characters
- Validates path integrity (no forks, broken paths, or fake turns)
- Collects each letter only once


### Solution
The solution is broken down into smaller functions:
- `validateMap`: Ensures all characters in the map are valid and finds starting position
- `findInitialDirection`: Determines the first valid direction from start
- `findNewDirection`: Handles direction changes at turns
- `moveInDirection`: Handles position updates
- `validateInBounds`: Ensures path stays within map boundaries


## How to test

### Prerequisites
- Node.js
- pnpm

### Installation
```bash
pnpm install
```

### Running Tests
```bash
pnpm test
```
