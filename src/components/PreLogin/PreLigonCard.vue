<template>
  <v-card width="344" class="absolute">
    <v-card-title class="justify-center">登入</v-card-title>
    <v-container>
      <v-form>
        <v-text-field label="帳號" type="email" outlined></v-text-field>
        <v-text-field label="密碼" type="password" outlined></v-text-field>
      </v-form>
    </v-container>
    <v-btn block color="primary">登入</v-btn>
  </v-card>
</template>

<script>
export default {};
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
