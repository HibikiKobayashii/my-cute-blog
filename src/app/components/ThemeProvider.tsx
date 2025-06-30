'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

// ▼▼▼ このファイルのインポートと型指定を修正しました ▼▼▼
export function ThemeProvider({ children, ...props }: React.PropsWithChildren<Omit<ThemeProviderProps, 'children'>>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
