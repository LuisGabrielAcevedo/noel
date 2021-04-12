import Vue from "vue";

export const Login = async identification => {
  const resp = await Vue.axios({
    method: "POST",
    url: "login",
    data: {
      identification,
    },
  });
  return resp.data;
};

export const ClearSession = async () => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/clear-session",
  });
  return resp.data;
};

export const UpdateUser = async user => {
  const resp = await Vue.axios({
    method: "POST",
    url: "update-profile",
    data: user,
  });
  return resp.data;
};

export const Register = async user => {
  const resp = await Vue.axios({
    method: "POST",
    url: "register",
    data: user,
  });
  return resp.data;
};

export const SaveMessage = async data => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/store-pqr",
    data,
  });
  return resp.data;
};

export const GetBalance = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/get-balance",
  });
  return resp.data;
};

export const SaveCodes = async data => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/code-redemptions",
    data,
  });
  return resp.data;
};

export const GetCodes = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/code-redemptions",
  });
  return resp.data;
};

export const GetCodesRedemtions = async () => {
  const resp = await Vue.axios({
    method: "GET",
    url: "v1/code-redemptions",
  });

  return resp.data;
};

export const GetLatestWinners = async () => {
  const resp = await Vue.axios({
    method: "GET",
    url: "v1/latest-winners",
  });

  return resp.data;
};

export const GetStatus = async () => {
  const resp = await Vue.axios({
    method: "Get",
    url: "v1/get-status-user",
  });
  return resp.data;
};
