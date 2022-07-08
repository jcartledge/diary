type ConditionalProps = React.PropsWithChildren<{ predicate: boolean }>;

export const Conditional: React.FC<ConditionalProps> = ({
  children,
  predicate,
}) => (predicate ? <>{children}</> : null);
