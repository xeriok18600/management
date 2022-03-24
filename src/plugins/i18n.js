import Vue from "vue";
import VueI18n from "vue-i18n";

// i18n 翻譯文件
import en from "@/i18n/en/lang"; // 存放英文翻譯
import tw from "@/i18n/tw/lang"; // 存放繁體翻譯
import jp from "@/i18n/jp/lang"; // 存放繁體翻譯

// 使用 vue-i18n
Vue.use(VueI18n);

// 放入翻譯的json
const messages = {
  en,
  tw,
  jp,
};

// 抓取儲存在 localStorage 的 language, 沒有 language 為 tw
const locale = localStorage.getItem("language") || "tw";

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale,
  fallbackLocale: "tw", // 載入失敗時預設顯示中文
  messages,
});

export default i18n;
