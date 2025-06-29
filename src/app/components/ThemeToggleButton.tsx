'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="border border-subtle rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {/* ▼▼▼ アイコンを電球に変更 ▼▼▼ */}
      {/* 光っている電球 (ライトモード時に表示) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 block dark:hidden"
      >
        <path d="M12 2.25a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zM15.53 6.47a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zM19.5 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM16.59 16.59a.75.75 0 111.06-1.06l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06zM12 19.5a.75.75 0 01.75.75V21.75a.75.75 0 01-1.5 0V20.25a.75.75 0 01.75-.75zM7.41 16.59a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06zM4.5 12a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 014.5 12zM8.47 6.47a.75.75 0 011.06-1.06l-1.06-1.06a.75.75 0 11-1.06 1.06l1.06 1.06z"></path>
        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 015.25 5.25c0 2.228-1.343 4.12-3.262 4.912a.75.75 0 01-.438 1.418H10.45a.75.75 0 01-.438-1.418C8.093 16.12 6.75 14.228 6.75 12A5.25 5.25 0 0112 6.75zm0 1.5a3.75 3.75 0 00-3.75 3.75c0 1.763 1.11 3.245 2.624 3.662h2.252c1.513-.417 2.624-1.9 2.624-3.662A3.75 3.75 0 0012 8.25z" clipRule="evenodd"></path>
      </svg>
      {/* 消えている電球 (ダークモード時に表示) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 hidden dark:block"
      >
        <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 015.25 5.25c0 2.228-1.343 4.12-3.262 4.912a.75.75 0 01-.438 1.418H10.45a.75.75 0 01-.438-1.418C8.093 16.12 6.75 14.228 6.75 12A5.25 5.25 0 0112 6.75zm0 1.5a3.75 3.75 0 00-3.75 3.75c0 1.763 1.11 3.245 2.624 3.662h2.252c1.513-.417 2.624-1.9 2.624-3.662A3.75 3.75 0 0012 8.25z" clipRule="evenodd"></path>
      </svg>
      {/* ▲▲▲ ここまで変更 ▲▲▲ */}
    </button>
  )
}
