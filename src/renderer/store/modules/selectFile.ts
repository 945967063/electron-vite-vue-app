import { defineStore } from 'pinia'

export default defineStore('selectFile', {
  state: () => ({
    //文件目录数组
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileList: [] as any[]
  }),
  actions: {}
})
