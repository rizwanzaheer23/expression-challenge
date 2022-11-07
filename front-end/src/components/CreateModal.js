import React from "react";
import { AddCarForm } from "./AddCarForm";
import { PageTitle } from "./PageTitle";

export const CreateModal = ({ closeFlyOut, show, getData }) => {
  return (
    <div className={`${show ? "open" : "close"} modalContainer`}>
      <div className="modal">
        <ForeGround
          show={show}
          getData={getData}
          closeFlyOut={closeFlyOut}
        ></ForeGround>
        <BackGround closeFlyOut={closeFlyOut}></BackGround>
      </div>
    </div>
  );
};

const BackGround = ({ closeFlyOut }) => {
  return <div onClick={closeFlyOut} className="modalBG" />;
};

const ForeGround = ({ getData, closeFlyOut, show }) => {
  return (
    <div className="modalFG">
      <PageTitle>Add New Car</PageTitle>
      <AddCarForm show={show} getData={getData} closeFlyOut={closeFlyOut} />
    </div>
  );
};
