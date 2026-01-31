"use client";

import { useEffect, useState } from "react";
import { getToken } from "../lib/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const token = getToken();
    setIsAuthenticated(!!token);
    if (loading) setLoading(false); 
  };

  useEffect(() => {
    checkAuth(); 
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.storageArea === localStorage) {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    
    const handleTokenSet = () => checkAuth();
    window.addEventListener("token-set", handleTokenSet);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("token-set", handleTokenSet);
    };
  }, []);

  return { isAuthenticated, loading, refreshAuth: checkAuth };
};
