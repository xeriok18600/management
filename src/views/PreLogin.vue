<template>
  <v-row style="height: 100vh" no-gutters>
    <v-col class="relative">
      <transition name="fade" mode="out-in">
        <component
          class="absolute"
          :is="preLoginComponent"
          @btnClick="btnClick"
        />
      </transition>
    </v-col>
    <v-col class="primary relative">
      <div class="display-3 hello white--text">{{ $t("__helloWorld") }}</div>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.hello {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    preLoginComponent() {
      return this.$store.state.preLoginComponent;
    },
  },
  methods: {
    async btnClick(v) {
      try {
        if (this.preLoginComponent === "Register") {
          await this.axios.auth.register(v);
          this.$store.commit("setPreLoginComponent", "Login");
        } else {
          const { accessToken } = await this.axios.auth.login(v);
          this.$store.commit("setToken", accessToken);
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
}
</style>
