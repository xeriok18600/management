export default (apiWoker) => ({
  // 新增帳號
  register: (payload) => apiWoker.post("/register", payload),
  // 登入
  login: (payload) => apiWoker.post("/login", payload),
});
