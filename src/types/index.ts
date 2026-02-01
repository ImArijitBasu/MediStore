// User-related types
export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}
export type UserStatus = "ACTIVE" | "BANNED";
export type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithRelations extends User {
  carts?: Cart[];
  orders?: Order[];
  reviews?: Review[];
  sellerMedicines?: SellerMedicine[];
}

// Auth-related types
export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
  user?: User;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date;
  scope?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Medicine-related types
export interface MedicineCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  medicines?: Medicine[];
}

export interface Medicine {
  id: string;
  name: string;
  slug: string;
  brandName: string;
  genericName?: string;
  manufacturer?: string;
  description?: string;
  isOtc: boolean;
  thumbnail?: string;
  isActive: boolean;
  rating: number;
  totalRatings: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category?: MedicineCategory;
  sellers?: SellerMedicine[];
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

// Seller Medicine (Price/Stock variant)
export interface SellerMedicine {
  id: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  expiryDate?: Date;
  batchNumber?: string;
  isAvailable: boolean;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  medicineId: string;
  medicine?: Medicine;
  sellerId: string;
  seller?: User;
  cartItems?: CartItem[];
  orderItems?: OrderItem[];
}

// Cart types
export interface Cart {
  id: string;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
  items?: CartItem[];
}

export interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  cart?: Cart;
  sellerMedicineId: string;
  sellerMedicine?: SellerMedicine;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user?: User;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
  orderLogs?: OrderLog[];
  reviews?: Review[];
}

export interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  discount: number;
  subtotal: number;
  orderId: string;
  order?: Order;
  sellerMedicineId: string;
  sellerMedicine?: SellerMedicine;
}

export interface OrderLog {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  order?: Order;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  user?: User;
  rating: number;
  comment?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  medicineId: string;
  medicine?: Medicine;
  orderId?: string;
  order?: Order;
}

// Request/Response DTOs
export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
  image?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  image?: string;
  status?: UserStatus;
}

export interface CreateMedicineDto {
  name: string;
  brandName: string;
  genericName?: string;
  manufacturer?: string;
  description?: string;
  isOtc?: boolean;
  thumbnail?: string;
  categoryId: string;
}

export interface UpdateMedicineDto {
  name?: string;
  brandName?: string;
  genericName?: string;
  manufacturer?: string;
  description?: string;
  isOtc?: boolean;
  thumbnail?: string;
  categoryId?: string;
  isActive?: boolean;
}

export interface CreateSellerMedicineDto {
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  expiryDate?: Date;
  batchNumber?: string;
  discount?: number;
  medicineId: string;
}

export interface AddToCartDto {
  sellerMedicineId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CreateOrderDto {
  shippingAddress: string;
  paymentMethod?: string;
  notes?: string;
  items: {
    sellerMedicineId: string;
    quantity: number;
  }[];
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  notes?: string;
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
  medicineId: string;
  orderId: string;
}

// Filter/Search types
export interface MedicineFilter {
  categoryId?: string;
  search?: string;
  isOtc?: boolean;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sellerId?: string;
  sortBy?: "price" | "rating" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface OrderFilter {
  userId?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Simplified types for UI
export interface MedicineCard {
  id: string;
  name: string;
  brandName: string;
  genericName?: string;
  thumbnail?: string;
  rating: number;
  totalRatings: number;
  minPrice: number;
  maxPrice: number;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface CartItemDetails extends CartItem {
  sellerMedicine: SellerMedicine & {
    medicine: Medicine;
    seller: Pick<User, "id" | "name">;
  };
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  finalAmount: number;
  itemCount: number;
  createdAt: Date;
  shippingAddress: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  session: Session;
  accessToken: string;
  refreshToken: string;
}

export interface MedicineListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    medicines: Medicine[];
    total: number;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filters: {
      applied: Record<string, any>;
      sort: {
        by: string;
        order: string;
      };
    };
  };
}