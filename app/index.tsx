import { Redirect } from "expo-router";
import React from "react";
// root page

// check user has auth ?
// if not redirect to public  if true  redirect to (app)

const index = () => {
  return <Redirect href={"/(public)"} />;
};

export default index;
