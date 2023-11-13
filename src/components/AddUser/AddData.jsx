import React, { useRef } from "react";
import style from "./form.module.css";
import axios from "axios";
function AddUser(props) {
  const { addFunc } = props;
  console.log("add data");
  const formRef = useRef({
    name: "",
    gender: "",
    phone: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const inputData = {
      id: Math.round(Math.random() * 100),
      name: formRef.current.name.value,
      gender: formRef.current.gender.value,
      phone: formRef.current.phone.value,
    };
    axios
      .post("http://localhost:7400/users", inputData)
      .then((res) => {})
      .catch(() => {
        console.log("error");
      });

    addFunc(inputData);

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
export default React.memo (AddUser);
