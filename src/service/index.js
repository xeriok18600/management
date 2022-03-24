import axios from "axios";
import camelCase from "lodash/camelCase";
import store from "@/store";

const apiWorker = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
  headers: {
    common: {
      Accept: "application/json, */*",
    },
  },
});
/* Request Interceptor */
apiWorker.interceptors.request.use((config) => {
  if (!/(\/login)$/.test(config.url) || !/(\/register)$/.test(config.url)) {
    config.headers.Authorization = store.state.token || "FALSE_TOKEN";
  }

  return config;
});

/* Response Interceptor */
apiWorker.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status && status === 20001 && data.error_code) {
      return Promise.reject(data.error_code);
    }
    return data;
  },
  (err) => {
    switch (err) {
      case 504:
      case 404:
        console.error({ message: "服務器異常" });
        break;
      case 403:
        console.error({ message: "權限不足！" });
        break;
      default:
        console.error({ message: "未知錯誤！" });
        console.error(err);
        break;
    }
    return Promise.reject(err.response.data);
  }
);

// Collect API modules
const apiModules = {};
const requireApiModule = require.context("./api", false, /\.js$/);
requireApiModule.keys().forEach((fileName) => {
  const moduleConfig = requireApiModule(fileName);
  const moduleName = camelCase(
    fileName
      .split("/")
      .pop()
      .replace(/\.\w+$/, "")
  );

  apiModules[moduleName] = moduleConfig.default(apiWorker);
});
export default apiModules;
