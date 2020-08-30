import { Diary } from "components/organisms/Diary";
import DiaryHeader from "components/organisms/DiaryHeader";
import React from "react";

const DiaryPage: React.FC = () => (
  <>
    <DiaryHeader />
    <Diary />
  </>
);

export default DiaryPage;
