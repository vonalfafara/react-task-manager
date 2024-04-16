import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
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
      style={{ width: "400px" }}
      onHide={() => setDialogState(false)}
    >
      <p className="m-0">Details: {task.description}</p>
      <p>Status: {getStatusTags(task)} </p>
    </Dialog>
  );
};

export default ViewTask;
