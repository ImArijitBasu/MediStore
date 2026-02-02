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
      { title: "All sellers", url: "/admin-dashboard/sellers" },
      { title: "All users", url: "/admin-dashboard/users" },
      { title: "All orders", url: "/admin-dashboard/orders" },
      { title: "Orders Status", url: "/admin-dashboard/orders-status" },
      { title: "Statistics", url: "/admin-dashboard/statistics" },
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

