import type { ComponentChildren } from 'preact';
import Style from './Button.module.css';

interface Props {
  as?: 'a' | 'button';
  href?: string;
  children: ComponentChildren;
}

export default function Button({ as = 'button', href, children }: Props) {
  const Element = as;

  return (
    <Element className={Style.button} href={href}>
      {children}
    </Element>
  );
}
