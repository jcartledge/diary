# How to toggles

This project has a simple toggle implementation based on an environment variable. The variable is a space-separated list of enabled toggle names. That's it.

This means toggles can only be boolean values - a toggle is either present and therefore enabled, or not present and therefore disabled.

## Defining toggles in dev

When running the app in dev mode, toggles are read from the environment variable `VITE_TOGGLES`. This variable (if defined) is just a string of space separated toggle names. Any toggle named in the list is enabled.

To define a toggle in dev mode, create or edit `workspaces/client/.env`, and add or edit the variable as follows:

```
VITE_TOGGLES=auth suggestions
```

In the example above, the application would see two enabled toggles, `auth` and `suggestions`.

Note you will need to restart the dv server when editing the `.env` file as it is only read at application startup.

## Defining toggles in build

The diary-client image reads `TOGGLES` from the environment. This can be provided at build-time or when starting the client container.

## Consuming toggles in the UI

### React component

Use the `Toggle` component to wrap children that should only be displayed if the toggle is enabled:

```
<Toggle name="auth">
  <RequireLogin><SomeSecureContent /></RequireLogin>
</Toggle>
```

In the example above, the children will only be rendered when the toggle is enabled.

#### `isOff`

The `Toggle` component accepts a boolean prop, `isOff`, which negates the behaviour of the component: when this is passed (with default value of true), the children will only be rendered if the toggle is _not_ enabled.

```
<Toggle name="auth" isOff>
  <SomeSecureContent />
</Toggle>
```

### Hooks

#### `useToggles(): string[]`

Returns the list of enabled toggles.

#### `useToggle(toggleName: string): boolean`

Returns the state (enabled == true) of the named toggle.

## Unit testing with toggles

Any component which uses either the `Toggle` component, or the `useToggles` or `useToggle` hook needs to be wrapped in a `TogglesProvider`. This can be used to provide toggles as required for testing.

There are `wrapWithToggle` and `wrapWithToggles` helpers for testing with specified sets of toggle values.

## E2e testing with toggles

Create a new task in `batect-e2e.yml`, copying the base `e2e` task. Add TOGGLES to the `customise.diary-client.environment` section.
