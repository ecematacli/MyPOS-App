export interface ApiAction {
  [key: string]: {
    type: string;
    method: string;
    url: string;
    data?: any;
    successMessage?: (m: string, t: string) => void;
    errorMessage?: (m: string, t: string) => void;
  };
}
