import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectFromCollectorByTime = (time) => {
  return axiosPython.request({
    url: 'collect/selectFromCollectorByTime',
    data: {
      data:{time}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


