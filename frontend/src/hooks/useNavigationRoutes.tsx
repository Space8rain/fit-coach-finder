import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { routesConfig } from '@/config/routes'
import type { LucideIcon } from 'lucide-react'

export type NavItem = {
  path: string;
  title: string;
  icon?: LucideIcon;
};

export function useNavigation() {
  const { user } = useAuth();

  return useMemo(() => {
    const role = user?.role;
    if (!role) return [];

    const config = routesConfig[role];
    if (!config) return [];

    const items: NavItem[] = [];

    config.forEach(route => {
      const basePath = route.path ?? "/";

      // если есть children — считаем этот route контейнером, в меню не добавляем
      if (!route.children && route.title) {
        items.push({
          path: basePath,
          title: route.title,
          icon: route.icon,
        });
      }

      route.children?.forEach(child => {
        let childPath: string;

        if (child.index) {
          childPath = basePath;
        } else if (child.path) {
          childPath = `${basePath}/${child.path}`.replace("//", "/");
        } else {
          return;
        }

        if (!child.title) return;

        items.push({
          path: childPath,
          title: child.title,
          icon: child.icon,
        });
      });
    });

    return items;
  }, [user?.role]);
}
