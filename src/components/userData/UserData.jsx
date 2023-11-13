import React, { useState } from "react";
import style from "./card.module.css";
import UpdateData from "../updateData/UpdateData";
function Userdata({ users, deleteFunc, updateData, getData,lastuser }) {
  const [update, setUpdate] = useState("");
  // console.log("userdata");
  return (
    <div>
      {users.map((user) => (
        <div className={style.cardWrapper} key={user.id}>
          <div>
            <p>Name:{user.name}</p>
            <p>Gender:{user.gender}</p>
            <p>Phone:{user.phone}</p>
            <button onClick={() => setUpdate(user.id)}>update</button>
            <div
              className={style.deleteBtn}
              onClick={(event) => deleteFunc(event, user.id)}
            >
              <div>X</div>
            </div>
          </div>
        </div>
      ))}
      {update && (
        <UpdateData updateId={update} setState={updateData} getData={getData} lastuser={lastuser} />
      )}
    </div>
  );
}
export default Userdata;
