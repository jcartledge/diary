import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrap } from "souvlaki";
import { withAuth0Wrapper } from "test/wrappers/withAuth0Wrapper";
import { describe, expect, it, vi } from "vitest";
import { UserNav } from "./UserNav";

const getLogoutButton = () => screen.queryByRole("button", { name: "Log out" });

describe("UserNav", () => {
  it("displays the user's nickname", () => {
    const user = { nickname: "test nick" };

    render(<UserNav />, {
      wrapper: wrap(
        withAuth0Wrapper({
          isAuthenticated: true,
          user,
        })
      ),
    });

    expect(screen.getByText(user.nickname)).toBeInTheDocument();
  });

  it("has a working logout button", async () => {
    const logout = vi.fn();
    const user = userEvent.setup();

    render(<UserNav />, {
      wrapper: wrap(
        withAuth0Wrapper({
          isAuthenticated: true,
          logout,
        })
      ),
    });
    await user.click(getLogoutButton()!);

    expect(logout).toHaveBeenCalled();
  });

  it("doesn't render when no authenticated user", () => {
    const user = { nickname: "test nick" };

    render(<UserNav />, {
      wrapper: wrap(
        withAuth0Wrapper({
          isAuthenticated: false,
          user,
        })
      ),
    });

    expect(screen.queryByText(user.nickname)).not.toBeInTheDocument();
    expect(getLogoutButton()).not.toBeInTheDocument();
  });
});
