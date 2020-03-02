export enum ActionTypes {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES'
}

export interface Category {
  id: number;
  name: string | null;
}

export type CategoriesState = Category[];

export interface CategoriesAction {
  type: ActionTypes.FETCH_CATEGORIES;
  payload: Category[];
}
