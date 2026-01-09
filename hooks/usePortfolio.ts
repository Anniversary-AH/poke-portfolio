"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioItem, PortfolioStats } from "@/types/portfolio";

const STORAGE_KEY = "poke-portfolio-items";

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      }
    } catch (error) {
      console.error("Error loading portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save items to localStorage
  const saveItems = useCallback((newItems: PortfolioItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  }, []);

  // Add item
  const addItem = useCallback(
    (item: Omit<PortfolioItem, "id">) => {
      const newItem: PortfolioItem = {
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
      };
      const newItems = [...items, newItem];
      saveItems(newItems);
    },
    [items, saveItems]
  );

  // Update item
  const updateItem = useCallback(
    (id: string, updates: Partial<PortfolioItem>) => {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      saveItems(newItems);
    },
    [items, saveItems]
  );

  // Delete item
  const deleteItem = useCallback(
    (id: string) => {
      const newItems = items.filter((item) => item.id !== id);
      saveItems(newItems);
    },
    [items, saveItems]
  );

  // Calculate stats
  const stats: PortfolioStats = items.reduce(
    (acc, item) => {
      const cost = item.purchasePrice * item.quantity * (1 + item.feesPercent / 100);
      const value = item.marketPrice * item.quantity;
      const pl = value - cost;

      acc.totalCost += cost;
      acc.totalValue += value;
      acc.totalPLDollar += pl;

      if (item.type === "single") {
        acc.singlesValue += value;
      } else {
        acc.sealedValue += value;
      }

      return acc;
    },
    {
      totalCost: 0,
      totalValue: 0,
      totalPLDollar: 0,
      totalPLPercent: 0,
      singlesValue: 0,
      sealedValue: 0,
    }
  );

  stats.totalPLPercent =
    stats.totalCost > 0
      ? (stats.totalPLDollar / stats.totalCost) * 100
      : 0;

  return {
    items,
    isLoading,
    addItem,
    updateItem,
    deleteItem,
    stats,
  };
}
