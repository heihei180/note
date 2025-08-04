import { defineUserConfig } from "vuepress";

import theme from "./theme.js";


export default defineUserConfig({
  base: "/note",

  lang: "zh-CN",
  title: "筆記本首頁",
  description: "不知道要寫些什麽，隨手記錄",

  theme,
  
  

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
