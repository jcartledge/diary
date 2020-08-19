import React from "react";
import { Diary } from "./components/Diary";

const App: React.FC = () => <Diary date={new Date()} />;

export default App;
