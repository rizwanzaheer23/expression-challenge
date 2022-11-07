import React from "react";
import { PageTitle } from "./PageTitle";
import { UpdateCarForm } from "./UpdateCarForm";

export const MyUpdateModal = ({ item, show, closeModal, getData }) => {
  return (
    <div className={`${show ? "open" : "close"} modalContainer`}>
      <div className="modal">
        <ForeGround
          getData={getData}
          closeModal={closeModal}
          item={item}
          show={show}
        ></ForeGround>
        <BackGround closeModal={closeModal}></BackGround>
      </div>
    </div>
  );
};

const BackGround = ({ closeModal }) => {
  return <div onClick={closeModal} className="modalBG" />;
};

const ForeGround = ({ item, closeModal, getData, show }) => {
  return (
    <div className="modalFG">
      <PageTitle>Update Car</PageTitle>
      {item && (
        <UpdateCarForm
          show={show}
          getData={getData}
          closeModal={closeModal}
          item={item}
        />
      )}
    </div>
  );
};
