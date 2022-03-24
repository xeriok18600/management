export default (apiWoker) => ({
  // 取得文章
  getPosts: () => apiWoker.get("/posts"),
  // 取得言論
  getComments: (payload) => apiWoker.get(`/comments${payload}`),
  // 取得言論
  getAuthor: (payload) => apiWoker.get(`/author${payload}`),
});
