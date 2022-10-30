// import { useEffect } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  toastFail,
  toastFailTechRegister,
  toastSuccesLogin,
  toastSuccesRegister,
  toastSuccesTechEdit,
  toastSuccesTechRegister,
  toastSuccesTechRmv,
} from "../components/Toast";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [techAddModal, setTechAddModal] = useState(false);
  const [techEditRmvModal, setTechEditRmvModal] = useState(false);
  const [techList, setTechList] = useState([]);
  const [newTechList, setNewTechList] = useState([]);
  const [actualTech, setActualTech] = useState({
    id: null,
    title: null,
    status: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@KenzieHub-token");
      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
          const { data } = await api.get("/profile");
          setUserData(data);
          setTechList(data.techs);
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  useEffect(() => {
    setTechList(newTechList);
  }, [newTechList]);

  async function onSubmitLoginFunction(data) {
    await api
      .post("sessions", { ...data })
      .then((response) => {
        const { user, token } = response.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserData(user);
        localStorage.setItem("@KenzieHub-token", token);
        setTechList(response.data.user.techs);
        navigate("/Dashboard", { replace: true });
        toastSuccesLogin();
      })
      .catch((response) => {
        console.log(response);
        toastFail();
      });
  }

  async function onSubmitRegisterFunction(data) {
    await api
      .post("users", { ...data })
      .then((res) => {
        toastSuccesRegister();
      })
      .catch((res) => {
        console.error(res);
        toastFail();
      });
    navigate("../");
  }

  function onSubmitRegisterTechFunction(data) {
    api
      .post("/users/techs", data)
      .then((res) => {
        setNewTechList([...techList, res.data]);
        toastSuccesTechRegister();
        setTechAddModal(false);
      })
      .catch((res) => {
        console.error(res);
        toastFailTechRegister();
      });
  }

  async function actTechList() {
    const { id } = userData;
    await api.get(`/users/${id}`).then((res) => {
      setNewTechList(res.data.techs);
    });
  }

  

  async function handleTechEdit(data) {
    const { id } = actualTech;
    await api.put(`/users/techs/${id}`, { status: data.status }).then(() => {
      actTechList();
      const newList = techList.filter((elem) => elem);
      setNewTechList(newList);
      setTechEditRmvModal(false);
      toastSuccesTechEdit();
    });
  }

  async function handleTechRmv() {
    const { id } = actualTech;
    await api.delete(`/users/techs/${id}`).then(() => {
      const newList = techList.filter((elem) => elem.id !== id);
      setNewTechList(newList);
      toastSuccesTechRmv();
      setTechEditRmvModal(false);
    });
  }

  function logout() {
    navigate("../", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        loading,
        techList,
        userData,
        actualTech,
        setUserData,
        techAddModal,
        handleTechRmv,
        setActualTech,
        handleTechEdit,
        setTechAddModal,
        techEditRmvModal,
        setTechEditRmvModal,
        onSubmitLoginFunction,
        onSubmitRegisterFunction,
        onSubmitRegisterTechFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
