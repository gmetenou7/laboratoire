import axios from "axios";

let url = "http://51.38.42.38:8098/api/";
// let data = {
//   email: "users@users.com",
//   password: "12345",
// };

//  let url ="http://localhost:8000/api/"
//     let data ={
//     "email":"anas@users.com",
//       "password":"12345",
//     }

export async function getAppToken() {
  let response = await axios.post(`${url}loginapi`, data);
  axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
  if (response.status === 200) {
    return response.data.data.token;
  } else {
    return false;
  }
}
