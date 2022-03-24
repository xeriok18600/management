// 可以做註冊與登入的共用組件, 並用 slot 來做之間的區別, 但我懶得做留給你們
<template>
  <v-card width="344" class="absolute">
    <v-card-title class="justify-center">{{ title }}</v-card-title>
    <v-container>
      <v-form>
        <v-text-field label="帳號" type="email" outlined></v-text-field>
        <v-text-field label="密碼" type="password" outlined></v-text-field>
      </v-form>
    </v-container>
    <v-btn block color="primary">{{ title }}</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.relative {
  position: relative;
  height: 100vh;
}

.absolute {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
