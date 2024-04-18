import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import "./ViewTask.css";

const images = import.meta.env.VITE_IMAGES;

const ViewTask = ({ task, dialogState, setDialogState }) => {
  function getStatusTags(data) {
    let severity = null;
    if (data.status === "Not Started") severity = "danger";
    else if (data.status === "Ongoing") severity = "warning";
    else severity = "success";

    return <Tag severity={severity} value={data.status} />;
  }
  return (
    <Dialog
      draggable={false}
      dismissableMask={true}
      header={task.title}
      visible={dialogState}
      onHide={() => setDialogState(false)}
      className="view-task-dialog"
    >
      <p className="m-0">Details: {task.description}</p>
      {task.image ? (
        <img src={`${images}/${task.image}`} className="task-image" />
      ) : null}

      <p>Status: {getStatusTags(task)} </p>
    </Dialog>
  );
};

export default ViewTask;
