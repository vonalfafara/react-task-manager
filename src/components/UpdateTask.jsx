import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import "./UpdateTask.css";

const UpdateTask = ({
  task,
  dialogState,
  setDialogState,
  handleUpdateTask,
  errors,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);

    return () => {};
  }, [task]);

  function updateTask(e) {
    e.preventDefault();
    handleUpdateTask(title, description, status);
    setTitle("");
    setDescription("");
    setStatus("");
  }

  return (
    <Dialog
      draggable={false}
      dismissableMask={true}
      header={task.title}
      visible={dialogState}
      style={{ width: "700px" }}
      onHide={() => setDialogState(false)}
    >
      <form onSubmit={updateTask} className="update-task-form">
        <InputText
          placeholder="What is your task?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          invalid={errors?.title}
        />
        <InputTextarea
          placeholder="What is your task about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          invalid={errors?.description}
        />
        <div className="radios">
          <div className="radio">
            <RadioButton
              inputId="status1"
              name="status"
              value="Not Started"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "Not Started"}
            />
            <label htmlFor="status1">Not Started</label>
          </div>
          <div className="radio">
            <RadioButton
              inputId="status2"
              name="status"
              value="Ongoing"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "Ongoing"}
            />
            <label htmlFor="status2">Ongoing</label>
          </div>
          <div className="radio">
            <RadioButton
              inputId="status3"
              name="status"
              value="Completed"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "Completed"}
            />
            <label htmlFor="status3">Completed</label>
          </div>
        </div>
        <div className="actions">
          <Button>Update Task</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default UpdateTask;
