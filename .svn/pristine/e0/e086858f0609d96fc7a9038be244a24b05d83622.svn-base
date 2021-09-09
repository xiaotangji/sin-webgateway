import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? '/gateway/' : ''
export const axiosPython = new HttpRequest(baseUrl)
// export const domain = '127.0.0.1:8077'

export function getAction(url, parameter) {
  return axiosPython.request({
    url: url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
