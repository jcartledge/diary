type ReactFCWithChildren = React.FC<React.PropsWithChildren>;

export const composeWrappers = (...args: ReactFCWithChildren[]): ReactFCWithChildren => {
  const [Outer, ...restArgs] = args;
  return restArgs.length > 0 ?
    wrap(Outer, composeWrappers(...restArgs)) :
    Outer;
}

const wrap = (Outer: ReactFCWithChildren, Inner: ReactFCWithChildren): ReactFCWithChildren => ({ children }) => (
  <Outer><Inner>{children}</Inner></Outer>
)
