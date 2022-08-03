import axios from "axios";

export const getUsers = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/admin/",
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const getUserData = async (successCallback, errorCallback) => {
  const options = {
    method: "GET",
    url: "http://localhost:5000/admin/self",
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const createUser = async (data, successCallback, errorCallback) => {
  const options = {
    method: "POST",
    url: "http://localhost:5000/admin/",
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editUser = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: "PATCH",
    url: `http://localhost:5000/admin/${id}/`,
    headers: { "Content-Type": "application/json" },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const deleteUser = async (id, successCallback, errorCallback) => {
  const options = {
    method: "DELETE",
    url: `http://localhost:5000/admin/${id}/`,
    headers: { "Content-Type": "application/json" },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
