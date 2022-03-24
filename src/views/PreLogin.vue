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
      <div class="display-3 hello white--text">{{ $t("helloWorld") }}</div>
      <div class="bottom">
        <v-btn text dark @click="setLang('tw')">中</v-btn>
        <v-btn text dark @click="setLang('en')">英</v-btn>
        <v-btn text dark @click="setLang('jp')">日</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

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
      // try catch -> https://medium.com/unalai/%E8%AA%8D%E8%AD%98-try-catch-%E8%99%95%E7%90%86%E9%8C%AF%E8%AA%A4-f262d5690820
      // 利用目前的元件來做註冊或是登入的判斷
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
    setLang(v) {
      // i18n 切換
      this.$i18n.locale = v;
      localStorage.setItem("language", v);
    },
  },
};
</script>

<style scoped lang="scss">
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
}

.bottom {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}

.hello {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
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
