import { Tour } from '../types';

const tours: Tour[] = [
  {
    id: 'cultural-heritage',
    titleKey: 'tour.cultural.title',
    descriptionKey: 'tour.cultural.description',
    price: {
      usd: 899,
      azn: 1528,
    },
    duration: 7,
    rating: 4.8,
    imageUrls: [
      'https://images.pexels.com/photos/5825905/pexels-photo-5825905.jpeg',
      'https://images.pexels.com/photos/5375498/pexels-photo-5375498.jpeg',
      'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg',
    ],
    featured: true,
    categories: ['cultural', 'heritage', 'history'],
    availableDates: [
      '2025-06-15',
      '2025-07-10',
      '2025-08-05',
      '2025-09-12',
    ],
  },
  {
    id: 'caucasus-adventure',
    titleKey: 'tour.caucasus.title',
    descriptionKey: 'tour.caucasus.description',
    price: {
      usd: 1199,
      azn: 2038,
    },
    duration: 10,
    rating: 4.9,
    imageUrls: [
      'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
      'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
      'https://images.pexels.com/photos/10258793/pexels-photo-10258793.jpeg',
    ],
    featured: true,
    categories: ['adventure', 'mountain', 'trekking'],
    availableDates: [
      '2025-05-20',
      '2025-06-25',
      '2025-07-15',
      '2025-08-10',
    ],
  },
  {
    id: 'wine-gastronomy',
    titleKey: 'tour.gastronomy.title',
    descriptionKey: 'tour.gastronomy.description',
    price: {
      usd: 999,
      azn: 1698,
    },
    duration: 6,
    rating: 4.7,
    imageUrls: [
      'https://images.pexels.com/photos/5638695/pexels-photo-5638695.jpeg',
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      'https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg',
    ],
    featured: true,
    categories: ['food', 'wine', 'culinary'],
    availableDates: [
      '2025-06-05',
      '2025-07-20',
      '2025-09-05',
      '2025-10-10',
    ],
  },
  {
    id: 'silk-road',
    titleKey: 'tour.silkroad.title',
    descriptionKey: 'tour.silkroad.description',
    price: {
      usd: 1099,
      azn: 1868,
    },
    duration: 8,
    rating: 4.6,
    imageUrls: [
      'https://images.pexels.com/photos/6059094/pexels-photo-6059094.jpeg',
      'https://images.pexels.com/photos/6065429/pexels-photo-6065429.jpeg',
      'https://images.pexels.com/photos/8259568/pexels-photo-8259568.jpeg',
    ],
    featured: false,
    categories: ['history', 'cultural', 'heritage'],
    availableDates: [
      '2025-05-15',
      '2025-06-20',
      '2025-08-25',
      '2025-09-30',
    ],
  },
  {
    id: 'caspian-leisure',
    titleKey: 'tour.caspian.title',
    descriptionKey: 'tour.caspian.description',
    price: {
      usd: 799,
      azn: 1358,
    },
    duration: 5,
    rating: 4.5,
    imageUrls: [
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
      'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg',
      'https://images.pexels.com/photos/7394348/pexels-photo-7394348.jpeg',
    ],
    featured: false,
    categories: ['beach', 'relaxation', 'spa'],
    availableDates: [
      '2025-06-10',
      '2025-07-15',
      '2025-08-20',
      '2025-09-15',
    ],
  },
  {
    id: 'mountain-expedition',
    titleKey: 'tour.mountain.title',
    descriptionKey: 'tour.mountain.description',
    price: {
      usd: 1299,
      azn: 2208,
    },
    duration: 12,
    rating: 4.9,
    imageUrls: [
      'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg',
      'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    ],
    featured: true,
    categories: ['expedition', 'adventure', 'trekking'],
    availableDates: [
      '2025-05-25',
      '2025-06-30',
      '2025-07-25',
      '2025-08-30',
    ],
  },
];

export default tours;