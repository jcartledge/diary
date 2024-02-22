type ReactFCWithChildren = React.FC<React.PropsWithChildren>;

export const composeWrappers = (...wrappers: ReactFCWithChildren[]): ReactFCWithChildren => {
  const [Wrapper, ...restWrappers] = wrappers;
  return restWrappers.length > 0 ?
    wrap(Wrapper, composeWrappers(...restWrappers)) :
    Wrapper;
}

const wrap = (Outer: ReactFCWithChildren, Inner: ReactFCWithChildren): ReactFCWithChildren => ({ children }) => (
  <Outer><Inner>{children}</Inner></Outer>
)
