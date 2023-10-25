# React conditional

[![CI](https://github.com/jcartledge/react-conditional/actions/workflows/main.yml/badge.svg)](https://github.com/jcartledge/react-conditional/actions/workflows/main.yml)

Simple utility component for React that only renders its children when the boolean predicate prop is true.

```TSX
describe("Conditional", () => {
  it("renders children if the predicate is true", () => {
    render(
      <Conditional predicate={true}>
        some children
      </Conditional>
    );

    expect(
      screen.queryByText(/some children/)
    ).toBeInTheDocument();
  });

  it("does not render children if the predicate is false", () => {
    render(
      <Conditional predicate={false}>
        some children
      </Conditional>
    );

    expect(
      screen.queryByText(/some children/)
    ).not.toBeInTheDocument();
  });
});
```
