<template>
  <div class="home">
    <v-app-bar color="primary" dense dark elevation="0">
      <v-spacer></v-spacer>
      <v-btn text @click="logout"> 登出</v-btn>
    </v-app-bar>
    <v-container>
      <v-list three-line>
        <template v-for="item in posts">
          <v-list-item :key="item.title">
            <v-list-item-content>
              <v-list-item-title class="title">{{
                item.title
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.body }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-badge
                color="primary"
                overlap
                :value="item.commentsNum"
                :content="item.commentsNum"
              >
                <v-icon
                  large
                  @click="
                    $router.push({
                      name: 'Post',
                      params: { postId: item.id, post: item },
                    })
                  "
                  >fa-solid fa-comments</v-icon
                >
              </v-badge>
            </v-list-item-icon>
          </v-list-item>
          <v-divider :key="item.id"></v-divider>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    await this.getPosts();
    await this.getComments();
    await this.mapData();
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    async getPosts() {
      const data = await this.axios.posts.getPosts();
      this.posts = [...data];
    },
    async getComments() {
      const data = await this.axios.posts.getComments("");
      this.$store.commit("setComments", data);
    },
    mapData() {
      // 用 map 直接把 posts 加入 commentsNum 這參數
      this.posts = this.posts.map((ele) => ({
        ...ele,
        commentsNum:
          // 找出 comments postid 等於 post id 的陣列長度, 都沒有的話就為 0
          this.comments.filter((v) => v.postId === ele.id).length || 0,
      }));
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "PreLogin" });
    },
  },
};
</script>
