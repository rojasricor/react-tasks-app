import React, { useState, useRef } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const refInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    refInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  placeholder="Add task"
                  ref={refInput}
                  autoFocus
                  required
                />
                <button className="btn btn-success w-100 mt-2">Save</button>
              </form>
              {tasks.map(
                (t: ITask, i: number): JSX.Element => (
                  <div className="card card-body mt-2" key={i}>
                    <h2>{t.name}</h2>
                    <p className={t.done ? "" : "text-decoration-line-through"}>
                      {t.done + ""}
                    </p>
                    <div className="">
                      <button
                        className="btn btn-light btn-sm m-1"
                        onClick={() => toggleDoneTask(i)}
                      >
                        {t.done ? "✓" : "x"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => removeTask(i)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
