import { Product } from '../models';

export const PRODUCTS: Product[] = [
  {
    id: 0,
    name: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ' +
      'elit. Donec et porta ipsum, ut consequat nisi. Sed a enim interdum, ' +
      'bibendum neque in, volutpat nunc. Donec accumsan eros in lobortis ' +
      'placerat. Nullam suscipit sit amet turpis dapibus lobortis.',
    price: 275,
    category: 'Book',
    isAvailable: true
  },
  {
    id: 1,
    name: 'Test product',
    description: 'Description of test product.',
    price: 199,
    category: 'Sweets',
    isAvailable: true
  },
  {
    id: 2,
    name: 'Test product that isn\'t available',
    description: 'This product won\'t be shown on the page.',
    price: 5,
    category: 'Smartphone',
    isAvailable: false
  },
];
