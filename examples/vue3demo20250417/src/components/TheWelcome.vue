<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>文档</template>
    VUE 的官方文档给你提供了一些有用的信息
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>工具</template>

    这个项目通过vite构造，推荐的ide构建工具是：vscode + vue offical，
    如果你需要测试你的vue组件，推荐你看看vitest
  </WelcomeItem>

  <WelcomeItem>
    <!-- 设置icon -->
    <template #icon>
      <EcosystemIcon />
    </template>
    <!-- 设置标题 -->
    <template #heading>生态</template>

    为你的项目获取官方工具和依赖包：pinia，vue router， vue test utils，vue dev tools，如果你需要更多的资源，我们建议你去aws看看。
    

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>社区</template>

    Vue有一个活跃的社区，提供了很多的资源和支持。你可以在社区中找到很多的资源和支持。
    
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>支持Vue</template>
    Vue是一个开源项目，欢迎你为这个项目贡献代码。你可以在github上找到这个项目的代码。
  </WelcomeItem>
</template>
