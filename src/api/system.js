import {axiosPython} from "@/libs/python.request";

export const getSystemInfo = (cpu) => {
  return axiosPython.request({
    url: 'system/getSystemInfo',
    data: {
      data:{cpu}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const reboot = (cmd) => {
  return axiosPython.request({
    url: 'system/reboot',
    data: {
      data:{cmd}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
