import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  formatDate,
} from "@elastic/eui";
import React, { useState } from "react";
import axios from "axios";

export const MyTable = ({ items, getData, openEditModal, openDataModal }) => {
  const deleteItem = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/cars/delete`, {
        data: {
          id: _id,
        },
      });

      getData();
    } catch (err) {
    } finally {
    }
  };

  const columns = [
    {
      field: "name",
      name: "Name",
    },
    {
      field: "make",
      name: "Make",
    },
    {
      field: "prodYear",
      name: "Model",
    },
    {
      field: "features",
      name: "Features",
      render: (item) => {
        if (!item) item = { AC: false, PowerSteering: false };
        return (
          <ul>
            <li>
              <p>
                {item.AC ? (
                  <>
                    <EuiIcon type="check" /> <span>AC</span>
                  </>
                ) : (
                  <>
                    <EuiIcon type="cross" /> <span>AC</span>
                  </>
                )}
              </p>
            </li>
            <li>
              <p>
                {item.PowerSteering ? (
                  <>
                    <EuiIcon type="check" /> <span>PowerSteering</span>
                  </>
                ) : (
                  <>
                    <EuiIcon type="cross" /> <span>PowerSteering</span>
                  </>
                )}
              </p>
            </li>
          </ul>
        );
      },
    },
    {
      field: "date",
      name: "Added On",
      dataType: "date",
      render: (date) => formatDate(date, "dobLong"),
    },
    {
      field: "_id",
      name: "",
      render: (item) => {
        return (
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                color="primary"
                onClick={() => {
                  openEditModal(item);
                }}
                iconType="pencil"
                aria-label="Update"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                color="danger"
                onClick={async () => {
                  await deleteItem(item);
                }}
                iconType="trash"
                aria-label="Delete"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                color="success"
                onClick={() => {
                  openDataModal(item);
                }}
                iconType="eye"
                aria-label="details"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      },
    },
  ];

  return (
    <div>
      <EuiBasicTable
        className="anim-table"
        tableCaption="Cars"
        items={items}
        columns={columns}
      />
    </div>
  );
};
