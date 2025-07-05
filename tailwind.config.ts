import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', 
  // ▼▼▼ content の部分を修正しました ▼▼▼
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ▲▲▲ ここまで修正 ▲▲▲
  theme: {
    extend: {
      colors: {
        'base-light': '#f0f0f0',
        'base-dark': '#333333',
        'accent': '#555555',
        'subtle': '#777777',
        'code-bg': '#eeeeee',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;