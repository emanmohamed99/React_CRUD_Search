import React, { useEffect, useRef } from "react";
import style from "../AddUser/form.module.css";
import axios from "axios";
export default function UpdateData({ updateId, getData }) {
  const formRef = useRef({
    name: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    axios.get("http://localhost:7400/users/" + updateId).then((res) => {
      formRef.current.gender.value = res.data.gender;
      formRef.current.name.value = res.data.name;
      formRef.current.phone.value = res.data.phone;
    });
  }, [updateId]);
  console.log("update");
  function handleSubmit(event) {
    event.preventDefault();
    const inputData = {
      name: formRef.current.name.value,
      gender: formRef.current.gender.value,
      phone: formRef.current.phone.value,
    };
    axios
      .patch("http://localhost:7400/users/" + updateId, inputData)
      .then((res) => {
        getData();
      })
      .catch(() => {
        console.log("error");
      });

    event.target.reset();
  }

  return (
    <div className={style.parent}>
      <form className={style.inputes} ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="my-name">Name</label>
        <input
          id="my-name"
          className={style.inputes}
          name="name"
          type="text"
          required
        />
        <br />
        <label htmlFor="gender">Gender</label>
        <select className={style.inputes} name="gender" id="gender" required>
          <option value="none">select gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>

        <br />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          className={style.inputes}
          name="phone"
          type="text"
          required
        />
        <br />
        <input className={style.inputes} type="submit" value="submit" />
      </form>
    </div>
  );
}
