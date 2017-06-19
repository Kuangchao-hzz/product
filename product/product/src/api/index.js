import axios from 'axios'

// 更过axios参考配置 http://www.jianshu.com/p/df464b26ae58
const instance = axios.create({
  timeout: 50000,
  headers: {'X-Custom-Header': 'foobar'}
})

export default {
  // test method
  data_table () {
    return instance.get('https://www.easy-mock.com/mock/59423ea78ac26d795f0d9631/Kuangchao/table')
  }
}
