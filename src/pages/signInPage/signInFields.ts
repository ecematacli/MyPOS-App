interface Field {
  label: string;
  name: string;
}

export type SigninFields = Field[];

export const SIGNIN_FIELDS: SigninFields = [
  {
    label: 'Email Address*',
    name: 'email',
  },
  {
    label: 'Password*',
    name: 'password',
  },
];
