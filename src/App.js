import React, { useState } from "react";
import _ from "lodash";

const App = () => {
  //User Function
  let [user, setUser] = useState("Adam");
  let changeUser = () => {
    if (user === "Adam") {
      setUser("Bob");
    } else {
      setUser("Adam");
    }
  };

  //Todo Function
  let [todoList, setTodoList] = useState([
    { action: "Buy Flowers", done: true, id: 1 },
    { action: "Clean Cart", done: false, id: 2 },
    { action: "Sell Pride", done: false, id: 3 },
  ]);

  let [doneList, setDoneList] = useState([])

  let addTodoList = () => {
    if (!todoList.find((t) => t.action === inputTodo)) {
      setTodoList([
        ...todoList,
        { action: inputTodo, done: false, id: todoList.length + 1 },
      ]);
      setInputTodo("");
    } else {
      setErrorInput(true);
    }
  };

  //Input Function
  let [inputTodo, setInputTodo] = useState("");
  let [errorInput, setErrorInput] = useState(false);

  let onChangeInput = (e) => {
    setErrorInput(false);
    setInputTodo(e.target.value);
  };

  //Generate Table Function
  const onClickDoneTodoList = (i) => {
    const updatedList = todoList.map((t, index) => {
      if (index === i) {
        return {
          ...t,
          done: !t.done,
        };
      }
      return t;
    });
    setTodoList(updatedList);
  };

  let genTable = () => {
    return (
      <table className="table">
        <thead className="table-primary">
          <tr>
            <th scope="col">Number</th>
            <th scope="col">To Do</th>
            <th scope="col">Check</th>
          </tr>
        </thead>
        <tbody>
          {_.map(todoList, (t, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{t.action}</td>
                <td>
                  <input
                    type={"checkbox"}
                    checked={t.done}
                    onChange={() => onClickDoneTodoList(i)}
                  />{" "}
                  &nbsp;{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Manage Done Todo List
  let onClickDoneMe = () => {
    let oldTodoList = todoList
    _.map(oldTodoList, (t, i) => {
      if (t.done === true) {
        let newDoneList = todoList[i]
        oldTodoList.splice(i, i + 1)
        setTodoList(oldTodoList)
        setDoneList([...doneList, newDoneList])
      }
    })
    for (let i = 0; i >= todoList.length; i++) {
      
    }
  }

  return (
    <div>
      <h4
        className="bg-primary text-white text-center p-2"
        onClick={changeUser}
      >
        {user}'s To Do List ({todoList.length}{" "}
        {todoList.length > 1 ? "items" : "item"})
      </h4>
      <div className="container-fluid">
        <div className="my-1">
          <input
            className="form-control"
            value={inputTodo}
            onChange={(e) => onChangeInput(e)}
          />
          {errorInput && (
            <div className="text-danger">Please Enter New Todo</div>
          )}
          <button className="btn btn-primary mt-1 mb-5" onClick={addTodoList}>
            Add
          </button>
          {genTable()}
          <div className=" d-flex justify-content-center">
            <button
              className="btn btn-primary mt-3"
              onClick={onClickDoneMe}
            >
              DONE ME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
