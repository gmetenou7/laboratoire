import axios from "axios";
import { toast } from "react-toastify";
//let url = "http://localhost:8000/api/"
export let url = "http://51.38.42.38:8098/api/";
export default function callApi(auth, route: string, methode: string, query: any, body: any, formData: boolean = false) {
  let headers = {};
  if (auth) {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
  }

  // if (formData) {
  //   axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  // }

  let config = {
    url: url + route,
    method: methode,
    params: null,
    data: null,
  };
  if (query) {
    config.params = query;
  }
  if (body) {
    config.data = body;
  }
  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

export function callApiLogin(auth, route: string, methode: string, query: any, body: any) {
  let headers = {};
  // if (auth) {
  //   let token = localStorage.getItem("Apitoken");
  //   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  // }
  let config = {
    url: url + route,
    method: methode,
    params: null,
    data: null,
  };
  if (query) {
    config.params = query;
  }
  if (body) {
    config.data = body;
  }
  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
/*export function notification(type, message, time) {
    return toast(
      <div>
        <span className="text-center">{message}</span> <br />
      </div>,
      {
        position: "top-right",
        autoClose: time ? time : 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: type,
      }
    );
  }*/
export function notification(type, message) {
  toast[type](message);
}
export function formatData(data) {
  let message = " ";
  if (typeof data === "object") {
    for (let element in data) {
      message += data[element][0] + " ,";
    }
  }
  return message.substring(0, message.length - 1);
}
export function formatDate(date: any) {
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
export function sum_object(data, key) {
  let sum = 0;
  data.forEach((element) => {
    if (element[key]) sum += Number(element[key]);
  });
  console.log("total ", sum);
  return sum;
}

export function determine_if_checked(family_datas, current_id, status, key) {
  let result: any = null;
  if (status === "update") {
    for (let family of family_datas) {
      // console.log(" filtre ", family, "  current  ", current_id);
      if (family[key] === current_id) {
        result = true;
        break;
      }
    }
  }

  return result;
}
