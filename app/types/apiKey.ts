export interface APIKey {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  createdAt: string;
  lastRotated: string | null;
  showSecret?: boolean;
}
