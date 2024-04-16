import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";
import ViewTask from "../components/ViewTask";
import UpdateTask from "../components/UpdateTask";
import useApi from "../utils/http";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [viewDialog, setViewDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [task, setTask] = useState({});

  const api = useApi(token);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
    return () => {};
  }, []);

  async function getTasks() {
    setTableLoading(true);
    const { data } = await api.get("/tasks");
    setTasks(data);
    setTableLoading(false);
  }

  async function createTask(title, description) {
    try {
      const body = {
        title,
        description,
      };

      const { data } = await api.post("/tasks", body);
      toast.current.show({
        severity: "success",
        detail: data.message,
      });
      getTasks();
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  async function updateTask(updateTitle, updateDescription, updateStatus) {
    setUpdateDialog(false);
    try {
      const body = {
        title: updateTitle,
        description: updateDescription,
        status: updateStatus,
      };

      const { data } = await api.put(`/tasks/${task.id}`, body);
      toast.current.show({
        severity: "success",
        detail: data.message,
      });
      setTask({});
      getTasks();
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  async function deleteTask(id) {
    try {
      const { data } = await api.delete(`/tasks/${id}`);
      toast.current.show({
        severity: "success",
        detail: data.message,
      });
      getTasks();
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  function getStatusTags(data) {
    let severity = null;
    if (data.status === "Not Started") severity = "danger";
    else if (data.status === "Ongoing") severity = "warning";
    else severity = "success";

    return <Tag severity={severity} value={data.status} />;
  }

  async function handleViewTask(id) {
    setViewLoading(true);
    const { data } = await api.get(`/tasks/${id}`);
    setViewLoading(false);
    setTask(data);
    setViewDialog(true);
  }

  async function handleUpdateTask(id) {
    setUpdateLoading(true);
    const { data } = await api.get(`/tasks/${id}`);
    setUpdateLoading(false);
    setTask(data);
    setUpdateDialog(true);
  }

  function handleDeleteTask(data) {
    confirmDialog({
      dismissableMask: true,
      draggable: false,
      message: `Are you sure you want to delete this task?`,
      header: `Delete task ${data.title}`,
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => deleteTask(data.id),
      reject: () => {},
    });
  }

  function getActions(data) {
    return (
      <div className="table-actions">
        <Button
          icon="pi pi-search"
          size="small"
          rounded
          loading={viewLoading}
          onClick={() => handleViewTask(data.id)}
        />
        <Button
          icon="pi pi-pencil"
          severity="warning"
          size="small"
          rounded
          loading={updateLoading}
          onClick={() => handleUpdateTask(data.id)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          size="small"
          rounded
          onClick={() => handleDeleteTask(data)}
        />
      </div>
    );
  }

  async function logout() {
    try {
      await api.post("/logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      setErrors(error.response.data.errors);
      toast.current.show({
        severity: "error",
        detail: error.response.data.message,
      });
    }
  }

  function handleLogout() {
    confirmDialog({
      dismissableMask: true,
      draggable: false,
      message: "Are you sure you want to log out?",
      header: "Logout",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => logout(),
      reject: () => {},
    });
  }

  return (
    <Card title={`${user.name}'s tasks`} className="home">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Button severity="danger" onClick={handleLogout}>
        Logout
      </Button>
      <CreateTaskForm createTask={createTask} errors={errors} />
      <DataTable value={tasks} loading={tableLoading}>
        <Column field="title" header="Title"></Column>
        <Column header="Status" body={getStatusTags} />
        <Column header="Actions" body={getActions} />
      </DataTable>
      <ViewTask
        task={task}
        dialogState={viewDialog}
        setDialogState={(state) => setViewDialog(state)}
      />
      <UpdateTask
        task={task}
        dialogState={updateDialog}
        setDialogState={(state) => setUpdateDialog(state)}
        handleUpdateTask={updateTask}
      />
    </Card>
  );
};

export default Home;
