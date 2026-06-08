import ErrorPage from '@/pages/shared/ErrorPage';
import Layout from '@/pages/shared/layout/Layout';
import type { JSX } from 'react';
import React from 'react';
import { lazy } from 'react';
import { Home, History, User } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import { TrainerStatusProvider } from '@/providers/TrainerStatusProvider';

export type RouteConfig = {
  index?: boolean
  path?: string
  title: string
  element: React.LazyExoticComponent<() => JSX.Element>
  icon?: LucideIcon
  errorElement?: React.ComponentType
  layout?: React.ComponentType
  providers?: Array<React.ComponentType<{ children: React.ReactNode }>>
  children?: RouteConfig[]
}

export type RoutesConfig = RouteConfig[]

export const routesConfig: Record<string, RoutesConfig> = {
  coach: [
    {
      path: "/",
      title: 'Главная',
      icon: Home,
      element: lazy(() => import('@/pages/coach/HomePageCoach')),
      layout: Layout,
      errorElement: ErrorPage,
      providers: [TrainerStatusProvider],
      children: [
        {
          index: true,
          title: "Главная",
          icon: Home,
          element: lazy(() => import("@/pages/coach/HomePageCoach")),
        },
        {
          path: 'history',
          title: 'История',
          icon: History,
          element: lazy(() => import('@/pages/coach/HistoryPageCoach')),
        },
        {
          path: 'profile',
          title: 'Профиль',
          icon: User,
          element: lazy(() => import('@/pages/coach/ProfilePageCoach')),
        },
      ],
    },
  ],

  client: [
    {
      path: '/',
      title: 'Главная',
      icon: Home,
      element: lazy(() => import('@/pages/client/HomePageClient')),
      layout: Layout,
      errorElement: ErrorPage,
      children: [],
    },
  ],
}
