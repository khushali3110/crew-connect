export type EventPosition = {
  title: string;
  description: string;
  rate: string;
  rateUnit: string;
  openings: number;
};

export type OtherEvent = {
  title: string;
  category: string;
  city: string;
  slug: string;
  daysAway: string;
};

export type EventItem = {
  title: string;
  slug?: string;
  company?: string;
  subTitle?: string;
  companyRating?: string;
  companyTier?: string;
  companyImage?: string;
  companyBio?: string;
  category?: string;
  city: string;
  venue: string;
  address?: string;
  date: string;
  startDate?: string;
  duration?: string;
  rate: string;
  contractType?: string;
  staffNeeded?: string;
  tagline?: string;
  vision?: string;
  tags: string[];
  about?: string;
  responsibilities?: string[];
  skills?: string[];
  positions?: EventPosition[];
  otherEvents?: OtherEvent[];
  mapImage?: string;
  mapAddress?: string;
  image: string;
  featured?: boolean;
};

export type IndustryItem = {
  title: string;
  copy: string;
  image: string;
  badge?: string;
  action?: string;
  sector?: string;
};
