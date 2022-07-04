import { useSetPath } from "./RouterContext";

type LinkProps = React.PropsWithChildren<{ to: string }>;

export const Link: React.FC<LinkProps> = ({ children, to }) => {
  const setPath = useSetPath();
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        setPath && setPath(to);
      }}
    >
      {children}
    </a>
  );
};
