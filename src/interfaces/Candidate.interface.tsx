// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  name?: string;
  login: string;
  id: string;
  company?: string;
  location: string;
  avatar_url: string;
  html_url: string;
  email: string;
  bio?: string;  
  status?: 'accepted' | 'rejected';
}