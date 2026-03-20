export const brand = {
  name: 'HYD VNTG',
  headline: 'HYD VINTAGE. REDEFINED.',
  tagline: 'Curated thrift. No repeats.',
  descriptor: "Hyderabad-based men's thrift and streetwear archive.",
  location: 'Hyderabad, India',
  instagramHandle: '@hydvntg.archive',
  instagramUrl: 'https://www.instagram.com',
};

export const heroImage =
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1600&q=80';

const productImages = [
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593032465171-8b9c4bead1b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1592878904946-b3cd7d2b6d5b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583002607720-bf4e2e1b0c5d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
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
    name: 'Washed Black Cargo',
    price: 1299,
    category: 'Streetwear Fits',
    image: productImages[0],
    stock: 1,
    accent: 'Heavy washed cargo with a loose fall and utility edge.',
  },
  {
    id: 'vintage-oversized-tee',
    name: 'Vintage Oversized Tee',
    price: 799,
    category: 'Vintage Tees',
    image: productImages[1],
    stock: 1,
    accent: 'Soft fade, wider shoulder, and thrift-store texture.',
  },
  {
    id: 'urban-fit-shirt',
    name: 'Urban Fit Shirt',
    price: 999,
    category: 'Streetwear Fits',
    image: productImages[2],
    stock: 1,
    accent: 'Relaxed shirt shape built for layered street rotation.',
  },
  {
    id: 'classic-street-jacket',
    name: 'Classic Street Jacket',
    price: 1499,
    category: 'Jackets',
    image: productImages[3],
    stock: 1,
    accent: 'Dark outer layer with clean lines and raw vintage weight.',
  },
  {
    id: 'minimal-essential-hoodie',
    name: 'Minimal Essential Hoodie',
    price: 1199,
    category: 'Hoodies',
    image: productImages[4],
    stock: 1,
    accent: 'Muted heavyweight hoodie for everyday oversized fits.',
  },
  {
    id: 'distressed-denim',
    name: 'Distressed Denim',
    price: 1399,
    category: 'Streetwear Fits',
    image: productImages[5],
    stock: 1,
    accent: 'Straight denim with broken-in wash and easy pairing.',
  },
];

export const featuredDropIds = [
  'washed-black-cargo',
  'vintage-oversized-tee',
  'classic-street-jacket',
  'minimal-essential-hoodie',
];

export const aboutCopy =
  'Hyderabad-based thrift store bringing handpicked vintage and streetwear pieces.';
