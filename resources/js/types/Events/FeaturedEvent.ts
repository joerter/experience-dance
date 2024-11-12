export interface FeaturedEvent {
  id: number;
  title: string;
  venueName: string;
  date: string;
  time: string;
  organization: {
    id: number;
    name: string;
  }
}
