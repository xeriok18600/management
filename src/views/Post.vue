<template>
  <div class="container">
    <v-card width="100%" outlined>
      <v-card-title class="display-1">{{ post.title }}</v-card-title>
      <v-card-text class="body-1">
        {{ post.body }}
      </v-card-text>
      <v-divider inset class="mx-auto my-4"></v-divider>
      <v-container>
        <v-list three-line outlined v-if="author.length !== 0">
          <template v-for="item in newComments">
            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <v-avatar color="primary">
                  <v-icon dark>fa-solid fa-user</v-icon>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.author }} 說</v-list-item-title>
                <v-list-item-subtitle>{{ item.body }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <h1 v-else>尚無評論</h1>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      author: [],
    };
  },
  methods: {
    async getAuthor() {
      const data = await this.axios.posts.getAuthor(
        `?id=${this.comments[0].authorId}`
      );
      this.author = [...data];
    },
  },
  computed: {
    comments() {
      return this.$store.state.comments.filter(
        (v) => v.postId === this.$route.params.postId
      );
    },
    newComments() {
      return this.comments.map((ele) => ({
        ...ele,
        author: this.author[0]?.name,
      }));
    },
  },
  async created() {
    await this.getAuthor();
  },
};
</script>
