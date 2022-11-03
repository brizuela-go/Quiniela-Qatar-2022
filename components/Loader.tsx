import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div>
      <div className="shadow"></div>
      <div className="gravity">
        <div className="ball"></div>
      </div>
    </div>
  );
};

export default Loader;
