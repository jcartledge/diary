import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";
import { createHelper } from "souvlaki";

const defaultMockedProviderProps: MockedProviderProps = {
  addTypename: false,
  mocks: [],
};
export const withMockedApolloProvider = createHelper(
  (props: MockedProviderProps = {}) =>
    ({ children }) =>
      (
        <MockedProvider {...{ ...defaultMockedProviderProps, ...props }}>
          {children}
        </MockedProvider>
      )
);
