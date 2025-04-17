<script setup lang="ts">

import { ref } from 'vue';


import logoImageSrc from './assets/logo.png';
import IAside from './components/IAside.vue'
const logoImage = ref(logoImageSrc);






</script>

<template>
  <div class="app-container">
    <el-container class="full-screen">
      <el-header class="header">
        <div>
          <el-image :src="logoImage" fit="fit" style="width: 80px;" />
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="aside">
          <IAside/>
        </el-aside>
        <el-main class="main">
          <!-- 内容区 -->
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
/* 关键点：确保根元素宽度和高度为 100% */
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 让 app-container 撑满全屏 */
.app-container {
  width: 100%;
  height: 100%;
}

/* 关键：让 el-container 占满整个视口 */
.full-screen {
  width: 100%;
  min-height: 100vh;
  /* 确保最小高度占满屏幕 */
}

.header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
  margin: 0 0 0 0;
}

.aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
}

.main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  padding: 20px;
}

.el-container {
  margin: 0 !important;
  padding: 0 !important;
}

</style>