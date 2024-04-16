import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useState } from "react";
import "./CreateTaskForm.css";

const CreateTaskForm = ({ createTask, errors }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreateTask(e) {
    e.preventDefault();
    createTask(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleCreateTask} className="create-task-form">
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
      <div className="actions">
        <Button>Create Task</Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
