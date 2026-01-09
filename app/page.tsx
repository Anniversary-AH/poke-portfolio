"use client";

import { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import ItemModal from "@/components/ItemModal";
import { PortfolioItem } from "@/types/portfolio";

export default function Home() {
  const { items, isLoading, addItem, updateItem, deleteItem, stats } =
    usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | undefined>();

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (itemData: Omit<PortfolioItem, "id">) => {
    if (editingItem) {
      updateItem(editingItem.id, itemData);
    } else {
      addItem(itemData);
    }
    setIsModalOpen(false);
    setEditingItem(undefined);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  const openEbaySearch = (item: PortfolioItem) => {
    const searchQuery = encodeURIComponent(
      `${item.name} ${item.set} ${item.cardNumber} ${item.variantOrProduct}`.trim()
    );
    const url = `https://www.ebay.com.au/sch/i.html?_nkw=${searchQuery}&LH_Complete=1&LH_Sold=1`;
    window.open(url, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">PokePortfolio AU</h1>
          <p className="text-gray-400">Track your Pokémon collection</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(stats.totalValue)}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">Total Cost</div>
            <div className="text-2xl font-bold text-blue-400">
              {formatCurrency(stats.totalCost)}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">Total P/L</div>
            <div
              className={`text-2xl font-bold ${
                stats.totalPLDollar >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {formatCurrency(stats.totalPLDollar)}
            </div>
            <div
              className={`text-sm ${
                stats.totalPLDollar >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {formatPercent(stats.totalPLPercent)}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-1">Singles / Sealed</div>
            <div className="text-lg font-semibold text-purple-400">
              {formatCurrency(stats.singlesValue)} /{" "}
              {formatCurrency(stats.sealedValue)}
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            + Add Item
          </button>
        </div>

        {/* Items Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No items yet. Click "Add Item" to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Buy Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Market Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      P/L
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {items.map((item) => {
                    const cost =
                      item.purchasePrice * item.quantity * (1 + item.feesPercent / 100);
                    const value = item.marketPrice * item.quantity;
                    const pl = value - cost;
                    const plPercent = cost > 0 ? (pl / cost) * 100 : 0;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                              item.type === "single"
                                ? "bg-purple-900 text-purple-200"
                                : "bg-orange-900 text-orange-200"
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium">{item.name}</div>
                          {item.set && (
                            <div className="text-xs text-gray-400">{item.set}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm">
                          {formatCurrency(item.purchasePrice)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {formatCurrency(item.marketPrice)}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold">
                          {formatCurrency(value)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div
                            className={`font-semibold ${
                              pl >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {formatCurrency(pl)}
                          </div>
                          <div
                            className={`text-xs ${
                              pl >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {formatPercent(plPercent)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openEbaySearch(item)}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded transition"
                            >
                              eBay AU
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(undefined);
        }}
        onSave={handleSave}
        item={editingItem}
      />
    </div>
  );
}
