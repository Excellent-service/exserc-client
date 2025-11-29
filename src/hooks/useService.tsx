import { useEffect, useState } from "react";

// Define your types
interface ServiceCategory {
  id: number;
  type: string;
  name: string;
  description: string;
}

interface Service {
  id: number;
  category: number;
  name: string;
  description: string | null;
  is_primary: boolean;
}

// Reusable typed fetcher
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  return res.json() as Promise<T>; // Explicit type assertion
}

const useService = () => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [categories, services] = await Promise.all([
          fetchData<ServiceCategory[]>(`${process.env.NEXT_PUBLIC_API_URL}/service/categories`),
          fetchData<Service[]>(`${process.env.NEXT_PUBLIC_API_URL}/service/services`)
        ]);

        setServiceCategories(categories);
        setServices(services);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    serviceCategories,
    services,
    loading,
    error
  };
};

export default useService;
