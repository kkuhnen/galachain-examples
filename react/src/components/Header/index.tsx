import { type FC, type ReactNode } from "react";
import logo from "~/assets/logo.svg";
import "./styles.css";

interface IProps {
  children?: ReactNode;
}

const Header: FC<IProps> = ({ children }) => (
  <header className="site-header">
    <div className="page-container">
      <img src={logo} alt="Gala Connect" className="site-header-logo" />
      {children}
    </div>
  </header>
);

export default Header;
