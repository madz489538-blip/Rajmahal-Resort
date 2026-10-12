import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string, params?: Record<string, string>) => void;
  routeParams: Record<string, string>;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentUrl, setCurrentUrl] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, params?: Record<string, string>) => {
    let finalUrl = to;
    if (params) {
      const search = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v) search.set(k, v);
      });
      const q = search.toString();
      if (q) finalUrl += `?${q}`;
    }

    if (window.location.pathname + window.location.search !== finalUrl) {
      window.history.pushState({}, '', finalUrl);
      setCurrentUrl(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Extract path and dynamic route params
  const { path, routeParams, searchParams } = useMemo(() => {
    const fullPath = window.location.pathname || '/';
    const sParams = new URLSearchParams(window.location.search);
    const rParams: Record<string, string> = {};

    // Match /stay/:roomId
    const stayMatch = fullPath.match(/^\/stay\/([^/]+)$/);
    if (stayMatch) {
      rParams.roomId = stayMatch[1];
    }

    // Match /booking/:bookingReference
    const bookingMatch = fullPath.match(/^\/booking\/([^/]+)$/);
    if (bookingMatch) {
      rParams.bookingReference = bookingMatch[1];
    }

    return {
      path: fullPath,
      routeParams: rParams,
      searchParams: sParams,
    };
  }, [currentUrl]);

  return (
    <RouterContext.Provider value={{ path, navigate, routeParams, searchParams }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({
  href,
  children,
  className = '',
  onClick,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
