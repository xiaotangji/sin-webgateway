import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";
export const updateMonitorSetting = (monitorSetting) => {
  return axiosPython.request({
    url: 'collect/updateMonitorSetting',
    data: {
      data:{monitorSetting}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
export const selectFromMonitor = () => {
  return axiosPython.request({
    url: 'collect/selectFromMonitor',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
