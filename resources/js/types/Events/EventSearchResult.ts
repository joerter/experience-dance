export interface EventSearchSuggestion {
  feature_type: string;
  name: string;
  place_formatted: string;
}

export interface EventSearchResult {
  attribution: string;
  response_id: string;
  suggestions: EventSearchSuggestion[];
}
