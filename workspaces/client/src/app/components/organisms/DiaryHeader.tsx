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
      <UserNav />
    </nav>
  </header>
);

export default DiaryHeader;
