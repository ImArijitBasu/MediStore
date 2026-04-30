export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: string;
  }[];
}

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      { title: "Overview", url: "/admin-dashboard", icon: "layout-dashboard" },
      { title: "Profile", url: "/admin-dashboard/profile", icon: "user" },
      { title: "All Users", url: "/admin-dashboard/all-users", icon: "users" },
      { title: "All Medicines", url: "/admin-dashboard/inventory", icon: "pill" },
      { title: "All Orders", url: "/admin-dashboard/all-orders", icon: "shopping-cart" },
      { title: "Category", url: "/admin-dashboard/categories", icon: "folder" },
    ],
  },
];

export const sellerRoutes: Route[] = [
  {
    title: "Seller",
    items: [
      { title: "Overview", url: "/seller-dashboard", icon: "layout-dashboard" },
      { title: "Profile", url: "/seller-dashboard/profile", icon: "user" },
      { title: "Inventory", url: "/seller-dashboard/inventory", icon: "package" },
      { title: "Add Medicine", url: "/seller-dashboard/add-medicine", icon: "plus-circle" },
      { title: "Orders", url: "/seller-dashboard/orders", icon: "shopping-cart" },
      { title: "Analytics", url: "/seller-dashboard/analytics", icon: "bar-chart-3" },
    ],
  },
];

export const customerRoutes: Route[] = [
  {
    title: "Customer",
    items: [
      { title: "Overview", url: "/dashboard", icon: "layout-dashboard" },
      { title: "Profile", url: "/dashboard/profile", icon: "user" },
      { title: "Cart", url: "/dashboard/cart", icon: "shopping-cart" },
      { title: "Orders", url: "/dashboard/orders", icon: "package" },
    ],
  },
];
