import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import { routesConfig, type RouteConfig } from '@/config/routes';
import type { User } from '@/types/user';
import LoginPage from '@/pages/shared/LoginPage';
import NotFoundPage from '@/pages/shared/NotFoundPage';
import ProfileWizard from '@/pages/shared/ProfileWizard/ProfileWizard';

export function createAuthRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "*",
      loader: () => redirect("/"),
    },
  ]);
};

export function createAppRouter(role: User["role"]) {
  if (!role) {
    return createBrowserRouter([
      {
        path: "/",
        element: <ProfileWizard />,
      },
      {
        path: "*",
        loader: () => redirect("/"),
      },
    ]);
  };

  function wrapWithProviders(
    providers: Array<React.ComponentType<{ children: React.ReactNode }>> | undefined,
    element: React.ReactNode
  ) {
    return (
      providers?.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
      }, element) ?? element
    );
  }

  function convert(config: RouteConfig[]): RouteObject[] {
    return config.map((route): RouteObject => {
      const Layout = route.layout;
      const ErrorElement = route.errorElement;
      const LazyComp = route.element;

      const lazyElement = (
        <Suspense fallback={<div>грузим...</div>}>
          <LazyComp />
        </Suspense>
      );

      const withLayout = Layout ? <Layout /> : lazyElement;
      const finalElement = wrapWithProviders(route.providers, withLayout);

      if (route.index) {
        return {
          index: true,
          element: finalElement,
        };
      }

      return {
        path: route.path!,
        element: finalElement,
        errorElement: ErrorElement ? <ErrorElement /> : undefined,
        children: route.children ? convert(route.children) : undefined,
      };
    });
  }


  return createBrowserRouter([
    ...convert(routesConfig[role]),
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
}
