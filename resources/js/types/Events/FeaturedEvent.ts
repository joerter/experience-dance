export interface FeaturedEvent {
  id: number;
  title: string;
  venueName: string;
  date: string;
  time: string;
  address: {
    streetLine1: string;
    streetLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  organization: {
    id: number;
    name: string;
  };
}
