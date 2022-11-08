import { EuiButton, EuiFlexGroup } from "@elastic/eui";
import { useEffect, useState } from "react";
import { MyLoader } from "./components/MyLoader";
import { MyTable } from "./components/MyTable";
import { PageTitle } from "./components/PageTitle";
import axios from "axios";
import { CreateModal } from "./components/CreateModal";
import { MyUpdateModal } from "./components/MyUpdateModal";
import { ViewDataModal } from "./components/ViewDataModal";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  const [updateItem, setUpdateItem] = useState(null);

  const [viewItem, setViewItem] = useState(null);

  const openDataModal = (id) => {
    setShowDataModal(true);
    const item = data.find((item) => item._id === id);
    setViewItem(item);
  };

  const closeDataModal = () => {
    setShowDataModal(false);
    setViewItem(null);
  };

  const openEditModal = (id) => {
    setShowEditModal(true);
    const item = data.find((item) => item._id === id);
    setUpdateItem(item);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setUpdateItem(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const getData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cars`
      );

      setData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <CreateModal
        getData={getData}
        closeFlyOut={closeCreateModal}
        show={showCreateModal}
      />
      <MyUpdateModal
        getData={getData}
        item={updateItem}
        closeModal={closeEditModal}
        show={showEditModal}
      />
      <ViewDataModal
        getData={getData}
        item={viewItem}
        closeModal={closeDataModal}
        show={showDataModal}
      />
      <EuiFlexGroup direction="column">
        <PageTitle>Welcome to Cars Dashboard</PageTitle>
        {loading && <MyLoader />}
        <>
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiButton color="primary" fill onClick={openCreateModal}>
              Add Car
            </EuiButton>
          </EuiFlexGroup>
          <MyTable
            openEditModal={openEditModal}
            items={data}
            getData={getData}
            openDataModal={openDataModal}
          />
        </>
      </EuiFlexGroup>
    </div>
  );
}

export default App;
