import { useSetPath } from "../contexts/RouterContext";

type LinkProps = React.PropsWithChildren<
  { to: string; disabled?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "onClick"
  >
>;

export const Link: React.FC<LinkProps> = ({
  children,
  to,
  disabled = false,
  ...anchorAttrs
}) => {
  const setPath = useSetPath();
  return disabled ? (
    <span aria-disabled>{children}</span>
  ) : (
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
