export const brand = {
  name: 'HYD VNTG',
  headline: 'HYD VINTAGE. REDEFINED.',
  tagline: 'Curated thrift. No repeats.',
  descriptor: "Synthetic Hyderabad thrift and streetwear storefront prototype.",
  location: 'Hyderabad, India',
  instagramHandle: 'not configured',
  instagramUrl: '',
};

export const heroImage = '/products/vintage-oversized-tee.jpg';

const productImages = [
  '/products/washed-black-cargo.jpg',
  '/products/vintage-oversized-tee.jpg',
  '/products/urban-fit-shirt.jpg',
  '/products/classic-street-jacket.jpg',
  '/products/minimal-essential-hoodie.jpg',
  '/products/distressed-denim.jpg',
];

export const navigation = [
  { label: 'Drops', href: '/#drops' },
  { label: 'Collection', href: '/#collection' },
  { label: 'About', href: '/#about' },
];

export const sizeOptions = ['S', 'M', 'L', 'XL'];

export const seedProducts = [
  {
    id: 'washed-black-cargo',
    name: 'Black 705 Tee',
    price: 799,
    category: 'Vintage Tees',
    image: productImages[0],
    stock: 1,
    accent: 'Black graphic tee used as a synthetic single-unit catalog fixture.',
  },
  {
    id: 'vintage-oversized-tee',
    name: 'Scarlet Varsity Tee',
    price: 899,
    category: 'Vintage Tees',
    image: productImages[1],
    stock: 1,
    accent: 'Bright graphic tee layered for the demo editorial.',
  },
  {
    id: 'urban-fit-shirt',
    name: 'Oxford Shirt Edit',
    price: 1099,
    category: 'Streetwear Fits',
    image: productImages[2],
    stock: 1,
    accent: 'Folded shirt selection representing a synthetic rotation.',
  },
  {
    id: 'classic-street-jacket',
    name: 'Teal Relaxed Denim',
    price: 1399,
    category: 'Streetwear Fits',
    image: productImages[3],
    stock: 1,
    accent: 'Relaxed teal denim texture used for the local order-preview workflow.',
  },
  {
    id: 'minimal-essential-hoodie',
    name: 'Tomato Club Sweatshirt',
    price: 1199,
    category: 'Hoodies',
    image: productImages[4],
    stock: 1,
    accent: 'Red oversized sweatshirt with a playful graphic back.',
  },
  {
    id: 'distressed-denim',
    name: 'Chambray Button-Down',
    price: 999,
    category: 'Streetwear Fits',
    image: productImages[5],
    stock: 1,
    accent: 'Blue button-down photographed as a clean synthetic catalog item.',
  },
];

export const featuredDropIds = [
  'washed-black-cargo',
  'vintage-oversized-tee',
  'classic-street-jacket',
  'minimal-essential-hoodie',
];

export const aboutCopy =
  'A Hyderabad-inspired storefront prototype using synthetic inventory to demonstrate browsing, stock state, and safe order-message preparation.';
