import { useSetPath } from "./RouterContext";

type LinkProps = React.PropsWithChildren<{ to: string }>;

export const Link: React.FC<LinkProps> = ({ children, to }) => {
  const setPath = useSetPath();
  return (
    <a
      href={to}
      onClick={(event) => {
        event.preventDefault();
        setPath && setPath(to);
      }}
    >
      {children}
    </a>
  );
};
