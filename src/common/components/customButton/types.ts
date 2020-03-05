export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'button';
  fullWidth?: boolean;
  classes: Partial<Record<'root', string>>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
