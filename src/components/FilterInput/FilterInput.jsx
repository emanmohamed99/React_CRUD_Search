import React from "react";
import styles from "./FilterInput.module.css";
const FilterInput = ({
  filterationSelect,
  filterationSearch,
  searchFilter,
}) => {
  const filterHandler = (e) => {
    const name = e.target.value;
    filterationSearch(name);
  };

  const filterHandlerGender = (e) => {
    const gender = e.target.value;
    filterationSelect(gender);
  };

  return (
    <div className={styles.searchwrapper}>
      <label>choose by Gender :</label>

      <select name="gender" id="gender" onChange={filterHandlerGender} required>
        <option value="none">select gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <br />
      <input
        className={styles.search}
        type="text"
        placeholder="filter by name"
        value={searchFilter}
        onChange={filterHandler}
        required
      />
    </div>
  );
};

export default React.memo(FilterInput);
