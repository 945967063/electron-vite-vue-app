<template>
  <div class="common-layout">
    <el-container>
      <el-aside><el-tree :data="fileList" accordion> </el-tree></el-aside>
      <el-container>
        <el-header>
          <el-button type="primary" @click="dialogClick">选择文件</el-button>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileList = ref<any[]>([])
const dialogClick = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (window as any).showDirectoryPicker({})

  const buildTree = async (obj) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tree = [] as any[]
    if (obj.entries) {
      const dirs = obj.entries()
      for await (const entry of dirs) {
        if (entry[1].isFile) {
          // 文件节点
          tree.push({
            label: entry[0],
            path: obj.name,
            fileHandle: entry[1],
            children: []
          })
        } else {
          // 文件夹节点，递归构建子树
          const subTree = await buildTree(entry[1])
          tree.push({
            label: entry[0],
            path: obj.name,
            children: subTree
          })
        }
      }
    }
    return tree
  }

  const fileListTree = await buildTree(res)
  fileList.value = fileListTree
}

// const showCode = async (item: any, index: number) => {
//   const file = await item.fileHandle.getFile()
//   const text = await file.text()
//   codeText.value = text
//   currentIndex.value = index
// }

// onMounted(() => {
//   const ipc = window.electron.ipcRenderer
//   ipc.on('save-finished', function (_event, fileList) {
//     console.log(fileList)
//     data.value = fileList
//   })
// })
</script>
<style lang="less" scoped>
.custom-node {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  .el-icon {
    margin-right: 10px;
  }
}
</style>
