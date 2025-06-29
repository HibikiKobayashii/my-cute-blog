import type { Config } from 'tailwindcss';

const config: Config = {
  // ▼▼▼ この行を追加 ▼▼▼
  darkMode: 'class', 
  // ▲▲▲ ここまで追加 ▲▲▲
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
