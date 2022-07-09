import { Toggle } from "lib/toggles/Toggle";
import React from "react";
import { FormattedDate } from "../atoms/FormattedDate";
import { UserNav } from "../molecules/UserNav";

const Brand = () => (
  <ul>
    <li>
      <strong>Diary</strong>
      <br />
      <FormattedDate />
    </li>
  </ul>
);

const DiaryHeader: React.FC = () => (
  <header>
    <nav>
      <Brand />
      <Toggle name="auth">
        <UserNav />
      </Toggle>
    </nav>
  </header>
);

export default DiaryHeader;
