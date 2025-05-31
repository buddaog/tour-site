export interface Tour {
  id: string;
  titleKey: string;
  descriptionKey: string;
  price: {
    usd: number;
    azn: number;
  };
  duration: number;
  rating: number;
  imageUrls: string[];
  featured: boolean;
  categories: string[];
  availableDates: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  photoUrl: string;
  tourId: string;
}

export interface BookingFormData {
  tourId: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
  requirements: string;
  consent: boolean;
}

export type Language = 'en' | 'az' | 'ru';
export type Currency = 'USD' | 'AZN';