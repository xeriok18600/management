<template>
  <v-card width="344" elevation="0">
    <v-card-title class="mb-10 px-0 display-1">註冊</v-card-title>
    <v-form>
      <div>
        <label>帳號</label>
        <v-text-field
          placeholder="請輸入電子郵件"
          dense
          type="email"
          outlined
          v-model="formData.email"
        ></v-text-field>
      </div>
      <div>
        <label>密碼</label>
        <v-text-field
          placeholder="請輸入至少四位數密碼"
          dense
          type="password"
          outlined
          v-model="formData.password"
        ></v-text-field>
      </div>
    </v-form>
    <v-btn block color="primary mt-4 mb-1" @click="$emit('btnClick', formData)"
      >註冊</v-btn
    >
    <v-btn text x-small @click="$store.commit('setPreLoginComponent', 'Login')"
      >已經有帳號了,切換到登入頁</v-btn
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
};
</script>
