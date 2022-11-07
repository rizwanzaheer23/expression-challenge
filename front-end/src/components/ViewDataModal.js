import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import React from "react";
import { PageTitle } from "./PageTitle";

export const ViewDataModal = ({ show, getData, item, closeModal }) => {
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
    <>
      {item && (
        <div className="modalFG">
          <PageTitle>{item?.name}</PageTitle>
          <div className="viewData">
            <p>Make: {item?.make}</p>
            <p>Added on: {new Date(item.date).toLocaleString()}</p>
            <p dangerouslySetInnerHTML={{ __html: item?.richText }}></p>
          </div>
        </div>
      )}
    </>
  );
};
