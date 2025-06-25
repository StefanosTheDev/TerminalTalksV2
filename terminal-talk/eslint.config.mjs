// eslint.config.mjs

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1️⃣ Ignore all generated Prisma client code
  { ignores: ['src/app/generated/**'] },

  // 2️⃣ Next.js + TypeScript recommended rules
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 3️⃣ Disable the "no-unescaped-entities" rule in your app code
  {
    files: ['src/app/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];
