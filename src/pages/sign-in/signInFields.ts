interface Field {
  label: string
  name: string
}

export type SigninFields = Field[]

export const SIGNIN_FIELDS: SigninFields = [
  {
    label: 'E-posta Adresi"*',
    name: 'email',
  },
  {
    label: 'Şifre*',
    name: 'password',
  },
]
