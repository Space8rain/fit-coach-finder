import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import { routesConfig, type RouteConfig } from '@/config/routes';
import type { User } from '@/types/user';

export function createAppRouter(role: User["role"]) {
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
        <Suspense fallback={<div>Loading...</div>}>
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


  const router = createBrowserRouter(convert(routesConfig[role]));
  return router;
}
