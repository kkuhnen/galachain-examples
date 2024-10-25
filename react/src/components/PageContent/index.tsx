import { type FC, type ReactNode } from "react";
import "./styles.css";

interface IProps {
  children?: ReactNode;
  centered?: boolean;
  pageTitle: string;
  srOnlyTitle?: boolean;
}

const PageContent: FC<IProps> = ({
  centered,
  children,
  srOnlyTitle,
  pageTitle,
}) => (
  <div className={`page-container main ${centered ? "centered" : ""}`}>
    {pageTitle && (
      <h1 className={`page-title ${srOnlyTitle ? "sr-only" : ""}`}>
        {pageTitle}
      </h1>
    )}
    {children}
  </div>
);

export default PageContent;
