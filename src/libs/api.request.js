import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
export const axios = new HttpRequest(baseUrl)
// export const domain = '127.0.0.1:8077'
