export type SliderItem = {
  id: number;
  image: string;
  is_active: boolean;
  order: number;
  title: string;
  url: string;
};

export type CategoryItem = {
  children: CategoryItem[];
  icon: string;
  id: number;
  image: string;
  name: string;
  order: number;
  products_length: number;
  slug: string;
};

export type ProductItem = {
  average_rating: number | null;
  category: CategoryItem[];
  discount_price: string;
  id: number;
  image: string;
  is_discount: boolean;
  is_stock: boolean;
  main_product_id: number;
  name: string;
  price: string;
  sku: string;
  slug: string;
};

export type CollectionItem = {
  id: number;
  image: string | null;
  order: number;
  products: ProductItem[];
  slug: string;
  title: string;
};

export type FavoriteItem = {
  id: number;
  product: ProductItem;
};

export type CartItem = {
  checkout_id: number;
  id: number;
  product: ProductItem;
  quantity: number;
  sub_total: number;
};

export type UserAddress = {
  id: number;
  title: string;
  address: string;
  phone_number: string;
  city: string;
  zip: string;
  lat: string;
  long: string;
};

export type User = {
  refresh: string;
  access: string;
  id: number;
  email: string;
  name: string;
  phone: string | null;
  date_joined: string;
};

export type ProductDetail = {
  id: number;
  all_product_values: {
    attribute: string;
    id: number;
    status: boolean;
    value: string;
  }[];
  ancestor_cats: {
    id: number;
    name: string;
    slug: string;
  }[];
  average_rating: number | null;
  brand: string;
  category: CategoryItem[];
  color: {
    hex_code: string;
    id: number;
    value: string;
  };
  created_at: string;
  description: string;
  discount_price: string;
  discount_type: string;
  discount_value: number;
  image: string;
  images: {
    id: number;
    image: string;
  }[];
  is_best: boolean;
  is_discount: boolean;
  is_hot: boolean;
  is_most: boolean;
  is_stock: boolean;
  main_product_id: number;
  max_quantity: number;
  name: string;
  pack_size: string;
  price: string;
  size: {
    id: number;
    value: string;
  };
  sku: string;
  slug: string;
  status: boolean;
  stock_count: number;
  store_business_name: string;
  store_id: number;
  store_slug: string;
  tax: number;
  type: {
    id: number;
    name: string;
    slug: string;
  };
  updated_at: string;
};
