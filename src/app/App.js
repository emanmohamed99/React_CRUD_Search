import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import Userdata from "../components/userData/UserData";
import "./App.css";
import AddUser from "../components/AddUser/AddData";
import FilterInput from "../components/FilterInput/FilterInput";

import axios from "axios";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState("");
  const [data, setData] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");
  const [selectFilter, setSelectFilter] = useState("");
  const getData = useCallback(() => {
    axios.get("http://localhost:7400/users").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, []);
  const namesHandler = () => {
    if (searchFilter.length !== 0 && selectFilter.length !== 0) {
      return data.filter(
        (el) => el.name.includes(searchFilter) && el.gender === selectFilter
      );
    }
    if (searchFilter.length !== 0) {
      return data.filter((el) => el.name.includes(searchFilter));
    }
    if (selectFilter.length !== 0 && selectFilter !== "none") {
      return data.filter((el) => el.gender === selectFilter);
    }
    if (sort === "female") {
      data.sort((a, b) => a.gender.localeCompare(b.gender));
    } else if (sort === "male") {
      data.sort((a, b) => b.gender.localeCompare(a.gender));
    }
    return data;
  };

  const deleteHandler = useCallback((e, selectedID) => {
    axios.delete("http://localhost:7400/users/" + selectedID).then(() => {
      getData();
    });
  }, []);

  const addUser = useCallback((user) => {
 
    setData((oldUsers) => [...oldUsers, { ...user }]);
  }, []);

  const sortHandler = (e) => {
    setSort(e.target.value);
  };
  const filterationSearch = useCallback((name) => {
    setSearchFilter(name);
  }, []);
  const filterationSelect = useCallback((gender) => {
    setSelectFilter(gender);
  }, []);
  const updateData = useCallback((update) => {
    setData(update);
  }, []);

  return (
    <Fragment>
      <button
        style={{
          backgroundColor: "lightblue",
          width: "100px",
          height: "50px",
          margin: "20px",
        }}
        onClick={() => setShowModal((prev) => !prev)}
      >
        Add User
      </button>
      <br />

      {showModal && <AddUser addFunc={addUser} />}
      <label
        style={{
          margin: "20px",
        }}
      >
        sort by Gender :
      </label>
      <select name="sort" id="sort" onChange={sortHandler}>
        <option value="none">sort by alphabetic</option>
        <option value="female">A-Z</option>
        <option value="male">Z-A</option>
      </select>
      <div>
        <FilterInput
          filterationSearch={filterationSearch}
          filterationSelect={filterationSelect}
          searchFilter={searchFilter}
        />
        <Userdata
          users={namesHandler()}
          deleteFunc={deleteHandler}
          updateData={updateData}
          getData={getData}
         
        />
      </div>
    </Fragment>
  );
}

export default App;
