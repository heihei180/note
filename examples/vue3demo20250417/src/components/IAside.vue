<script setup lang="ts">
defineProps<{

}>()


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>

  <el-row class="tac">
    <el-col :span="12">
      <h5 class="mb-2">南天门保安队</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>一级菜单1</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
          <el-menu-item-group title="分组">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>菜单4</template>
            <el-menu-item index="1-4-1">菜单4下的子菜单</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>一级菜单2</span>
        </el-menu-item>

        <el-menu-item index="3" disabled>
          <el-icon>
            <document />
          </el-icon>
          <span>一级菜单3</span>
        </el-menu-item>

        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>一级菜单4</span>
        </el-menu-item>
      </el-menu>
    </el-col>

  </el-row>
</template>

<style scoped>

.el-col-12{
  max-width: 100vh;
}


/* 深度选择器穿透（适用于 scoped 样式） */
:deep(.el-menu) {
  background-color: transparent;
}
.mb-2{
  margin-left: 9px;
}
</style>
