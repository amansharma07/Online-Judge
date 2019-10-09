import React, { Fragment } from "react";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();

  return (
    <Fragment>
      
          alert.show("u have been registered");
    </Fragment>
  );
};

export default Home;
