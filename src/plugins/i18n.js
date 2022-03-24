import Vue from "vue";
import VueI18n from "vue-i18n";

// i18n
import en from "../i18n/en/lang"; // 存放英文翻譯
import tw from "../i18n/tw/lang"; // 存放繁體翻譯

// init
Vue.use(VueI18n);

// translated locale messages
const messages = {
  tw,
  en,
};

const lang = localStorage.getItem("language") || "tw";

// Create VueI18n instance with options
const i18n = new VueI18n({
  lang,
  messages, // set locale messages
});

export default i18n;
