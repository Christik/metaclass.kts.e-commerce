import { useEffect, useState } from "react";

export const usePagination = (limit: number) => {
  const [items, setItems] = useState<any[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (items) {
      setTotal(Math.ceil(items.length / limit));
    }
  }, [items, limit]);

  return {
    setItems,
    total,
  };
};
