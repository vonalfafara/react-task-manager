import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useState, useRef } from "react";
import "./CreateTaskForm.css";

const CreateTaskForm = ({ createTask, errors }) => {
  const file = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreateTask(e) {
    e.preventDefault();
    createTask(title, description, file.current.getFiles()[0]);
    setTitle("");
    setDescription("");
    file.current.clear();
  }

  function headerTemplate(options) {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
      </div>
    );
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
      <FileUpload
        ref={file}
        name="file"
        accept="image/*"
        headerTemplate={headerTemplate}
      />
      <div className="actions">
        <Button>Create Task</Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
