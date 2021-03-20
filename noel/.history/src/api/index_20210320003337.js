import Vue from "vue";

export const Login = async (phone) => {
  // const resp = await Vue.axios({
  //   method: "POST",
  //   url: "login",
  //   data: {
  //     phone,
  //   },
  // });
  // return resp.data;
  return {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwNzkyMjMwYzc0MzM0ZjdhNGQ4OWQxOTk4YzQ1ZTc0ODgyZTQwN2YzZDU0MTQ3ZTU0NzA2Yjg4YWNhMmQ0ZTFkYTJlYWU3YTFhOTlhODhmIn0.eyJhdWQiOiI1IiwianRpIjoiZTA3OTIyMzBjNzQzMzRmN2E0ZDg5ZDE5OThjNDVlNzQ4ODJlNDA3ZjNkNTQxNDdlNTQ3MDZiODhhY2EyZDRlMWRhMmVhZTdhMWE5OWE4OGYiLCJpYXQiOjE2MTYyMTExMjAsIm5iZiI6MTYxNjIxMTEyMCwiZXhwIjoxNjQ3NzQ3MTIwLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.cKq1NMyb7HBKsdmjiyvqWkwzZF2qVnH9vV4B9WafxokSujh-0-5oFl_qMnyePyNN4y9iRfmOblaLIkHPDhIx3RTSKBDubHJcbLBaQDAaEIUY7O0Ohsgepoze-YpCzCeTIZapBgNVE_pGD0r21HAVeBmQU5SHW8cx-5frzT82kYtCtL9etiL3My6nPn6jhOBoWLjWYyBjZr6x9K0opEaDWN2C4hqiX5bbDtqXZ1_G6hil-blVXB-rTVc6CzmQ9ZFUsdDOskUt0sy9lijrMqSkjMwn_n5Rkm9g584u77MshnR_-I55Pl836s-1MfRXRIRGZxGRKsyPOtRwx3cMARR5LWi0MeSrr7SUDR6yCsZHCKdkGSxKMXYPXEUweg7r3F6Viy37MshxPgpUgksJOlxUv6JJ8hGswEmNqzmrFkFnwwYzYaDaKr5a-MLGeFD65MhO0JI1kGroNsFYLStHeVQS8J6rc1NDcqow-lvn9agFQ_YElIJUWx7ch5YeOpwL8SUu76R_CRiXZ247B4-RgGHj5EoQ4LiJCExQtjrLUaYC1mbt8xeXvdkeYkNltfZaD0ZQnSSXoOYF_8VAOhU4MQP8Qd0Y3Uzy3ThEp06RQRvUCcXyvxdRigO_SDmAR2d3h97Di4WUJO250yZc79yL8oqgw57qlbeol1JYQ6RSx7IdIBU","user":{"name":"luis acevedo acevedo","phone":"573001112222","email":"luisg@gamil.com","operator":"Claro","identification":"19777596","adult":1,"registered_in":"web","adult_validation":0},"type_login":"complete"}
};

export const ClearSession = async () => {
  const resp = await Vue.axios({
    method: "POST",
    url: "v1/clear-session"
  });
  return resp.data;
};

export const UpdateUser = async (user) => {
  const resp = await Vue.axios({
    method: "POST",
    url: "update-profile",
    data: user,
  });
  return resp.data;
};

export const Register = async (user) => {
  const resp = await Vue.axios({
    method: "POST",
    url: "register",
    data: user,
  });
  return resp.data;
};

export const SaveMessage = async (data) => {
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

export const SaveCodes = async (data) => {
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
