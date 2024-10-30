import { type FC, type ReactNode } from "react";
import Logo from "~/assets/logo.svg?react";
import "./styles.css";

interface IProps {
  children?: ReactNode;
}

const Header: FC<IProps> = ({ children }) => (
  <header className="site-header">
    <div className="page-container">
      <Logo className="site-header-logo" aria-label="Gala Connect" />
      {children}
    </div>
  </header>
);

export default Header;
