import { useSetPath } from "../contexts/RouterContext";

type LinkProps = React.PropsWithChildren<
  { to: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick"
  >
>;

export const Link: React.FC<LinkProps> = ({ children, to, ...anchorAttrs }) => {
  const setPath = useSetPath();
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        setPath && setPath(to);
      }}
      {...anchorAttrs}
    >
      {children}
    </a>
  );
};
