import useLoginStore from './modules/login'
import useSelectFile from './modules/selectFile'

export default function useStore() {
  return {
    login: useLoginStore(),
    selectFile: useSelectFile()
  }
}
