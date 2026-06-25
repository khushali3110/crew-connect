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

export type ApiListResponse<T> = {
  success: boolean;
  count: number;
  data: T[];
  message?: string;
};

export type JoinTeamRequest = {
  _id: string;
  firstName: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  yearsExperience: string;
  city: string;
  pincode: string;
  photoFileName?: string;
  photoContentType?: string;
  cvFileName?: string;
  cvContentType?: string;
  pageUrl?: string;
  createdAt: string;
  updatedAt?: string;
};

export type TeamRequest = {
  _id: string;
  gender: "Male" | "Female" | "Any";
  companyName: string;
  personName: string;
  phoneNumber: string;
  location: string;
  eventDate: string;
  personsRequired: string;
  eventType: string;
  city: string;
  pincode: string;
  pageUrl?: string;
  createdAt: string;
  updatedAt?: string;
};
