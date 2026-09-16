import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, FolderTree } from "lucide-react";

function AdminLayout() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={20} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FolderTree size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg ">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${
                location.pathname === menu.path
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow p-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
