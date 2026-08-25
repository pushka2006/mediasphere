"use client";

import { useState } from "react";
import { mockInventory } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Plus,
  AlertTriangle,
  Search,
  Coffee,
  UtensilsCrossed,
  Pizza,
  Cake,
  Building2,
  CheckCircle2,
  X,
} from "lucide-react";
import { InventoryItem } from "@/types";

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(mockInventory);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [newItem, setNewItem] = useState({
    name: "",
    category: "COFFEE & BEVERAGES",
    quantity: "",
    unit: "packs",
    rate: "",
    warehouse: "Mumbai Central Hub",
    vendor: "Cafe Campaign LLP",
  });

  const filteredInventory = inventoryList.filter((item) => {
    if (
      search &&
      !item.name.toLowerCase().includes(search.toLowerCase()) &&
      !item.vendor?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (categoryFilter !== "ALL" && item.category !== categoryFilter) return false;
    return true;
  });

  const totalValue = inventoryList.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const coffeeItems = inventoryList.filter((i) => i.category === "COFFEE & BEVERAGES");
  const cakeItems = inventoryList.filter((i) => i.category === "CAKES & BAKERY");
  const pizzaItems = inventoryList.filter((i) => i.category === "PIZZAS & SAVORY");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    const item: InventoryItem = {
      id: `i${Date.now()}`,
      name: newItem.name.trim(),
      category: newItem.category,
      unit: newItem.unit,
      quantity: Number(newItem.quantity) || 100,
      minStock: 20,
      rate: Number(newItem.rate) || 500,
      vendor: newItem.vendor,
      warehouse: newItem.warehouse,
      createdAt: new Date().toISOString(),
    };

    setInventoryList([item, ...inventoryList]);
    setIsModalOpen(false);
    setToastMsg(`Successfully added ${newItem.name} to stock!`);
    setNewItem({
      name: "",
      category: "COFFEE & BEVERAGES",
      quantity: "",
      unit: "packs",
      rate: "",
      warehouse: "Mumbai Central Hub",
      vendor: "Cafe Campaign LLP",
    });

    setTimeout(() => setToastMsg(""), 3500);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 glass p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl animate-bounce-slow">
          <CheckCircle2 size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Package className="text-brand-400" size={26} />
            Inventory & Stock Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track Café Campaign coffees, gourmet cakes, wood-fired pizzas & OOH raw materials
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>Add Stock Item</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4">
          <p className="text-[11px] font-semibold uppercase text-slate-400">Total Stock Value</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalValue)}</p>
          <p className="text-[10px] text-emerald-400 mt-1">Across 4 Central Warehouses</p>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Café Coffees</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">
              {coffeeItems.reduce((a, b) => a + b.quantity, 0).toLocaleString()} Units
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Dark Roast & Cold Brews</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Coffee size={24} />
          </div>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Gourmet Cakes</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">
              {cakeItems.reduce((a, b) => a + b.quantity, 0).toLocaleString()} Cakes
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Red Velvet & Truffle</p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Cake size={24} />
          </div>
        </div>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase text-slate-400">Wood-Fired Pizzas</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {pizzaItems.reduce((a, b) => a + b.quantity, 0).toLocaleString()} Kits
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Neapolitan Margherita</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Pizza size={24} />
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search stock item, coffee, cake, pizza, or vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter Category"
            className="form-input text-xs w-auto"
          >
            <option value="ALL">All Categories</option>
            <option value="COFFEE & BEVERAGES">Coffees & Beverages</option>
            <option value="CAKES & BAKERY">Cakes & Bakery</option>
            <option value="PIZZAS & SAVORY">Pizzas & Savory</option>
            <option value="FLEX">Flex Printing</option>
            <option value="VINYL">Vinyl Materials</option>
            <option value="LED">LED Lights</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity in Stock</th>
              <th>Unit Rate</th>
              <th>Total Stock Value</th>
              <th>Vendor / Brand</th>
              <th>Warehouse Hub</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => {
              const isLowStock = item.quantity <= item.minStock;
              return (
                <tr key={item.id} className="hover:bg-white/03 transition">
                  <td className="w-14">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-white/05 border border-white/10 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {item.category.substring(0, 2)}
                      </div>
                    )}
                  </td>
                  <td>
                    <p className="font-bold text-white text-xs">{item.name}</p>
                    {item.brand && (
                      <span className="text-[10px] text-brand-300 font-semibold">{item.brand}</span>
                    )}
                  </td>
                  <td>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/05 text-slate-300 border border-white/08">
                      {item.category}
                    </span>
                  </td>
                  <td className="font-bold text-slate-200">
                    {item.quantity.toLocaleString()} {item.unit}
                  </td>
                  <td className="text-slate-300">{formatCurrency(item.rate)}</td>
                  <td className="font-extrabold text-white">
                    {formatCurrency(item.quantity * item.rate)}
                  </td>
                  <td className="text-xs text-slate-300 font-medium">{item.vendor}</td>
                  <td className="text-xs text-slate-400">{item.warehouse}</td>
                  <td>
                    {isLowStock ? (
                      <span className="badge badge-cancelled flex items-center gap-1">
                        <AlertTriangle size={11} /> Low Stock
                      </span>
                    ) : (
                      <span className="badge badge-active">In Stock</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Stock Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg p-6 rounded-2xl border border-white/10 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-brand-400" />
                <h2 className="text-base font-bold text-white">Add New Stock Item</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3.5 text-xs">
              <div>
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cafe Campaign Cold Brew Concentrate"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="form-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    aria-label="Select Category"
                    className="form-input text-xs"
                  >
                    <option value="COFFEE & BEVERAGES">Coffee & Beverages</option>
                    <option value="CAKES & BAKERY">Cakes & Bakery</option>
                    <option value="PIZZAS & SAVORY">Pizzas & Savory</option>
                    <option value="FLEX">Flex Material</option>
                    <option value="VINYL">Vinyl Material</option>
                    <option value="LED">LED Lights</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Unit of Measure</label>
                  <input
                    type="text"
                    placeholder="packs / bottles / cakes / kits"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">Unit Rate (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 450"
                    value={newItem.rate}
                    onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Vendor / Brand</label>
                  <input
                    type="text"
                    placeholder="Cafe Campaign LLP"
                    value={newItem.vendor}
                    onChange={(e) => setNewItem({ ...newItem, vendor: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>

                <div>
                  <label className="form-label">Warehouse</label>
                  <input
                    type="text"
                    placeholder="Mumbai Central Hub"
                    value={newItem.warehouse}
                    onChange={(e) => setNewItem({ ...newItem, warehouse: e.target.value })}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-5">
                  Save Stock Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
