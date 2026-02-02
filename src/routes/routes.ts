export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

export const adminRoutes: Route[] = [
  {
    title: "Admin",
    items: [
      { title: "Profile", url: "/admin-dashboard/profile" },
      { title: "All Users", url: "/admin-dashboard/all-users" },
      { title: "All Medicines", url: "/admin-dashboard/inventory" },
      { title: "All Orders", url: "/admin-dashboard/all-orders" },
      { title: "Category", url: "/admin-dashboard/categories" },
    ],
  },
];

export const sellerRoutes: Route[] = [
  {
    title: "Seller",
    items: [
      { title: "Profile", url: "/seller-dashboard/profile" },
      { title: "Inventory", url: "/seller-dashboard/inventory" },
      { title: "Add medicine", url: "/seller-dashboard/add-medicine" },
      { title: "Orders", url: "/seller-dashboard/orders" },
    ],
  },
];

export const customerRoutes: Route[] = [
  {
    title: "Customer",
    items: [
      { title: "Profile", url: "/dashboard/profile" },
      { title: "Cart", url: "/dashboard/cart" },
      { title: "Orders", url: "/dashboard/orders" },
    ],
  },
];

