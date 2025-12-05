import path from 'node:path'

const buildEslintCommand = (filenames) => {
  const files = filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')

  return `eslint --fix --max-warnings=0 ${files}`
}

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.{css,scss}': ['prettier --write'],
}
