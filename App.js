import React from "react";

import Routes from './my-app/src/routes';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App(){
  return(
      <Routes/>

  );
}