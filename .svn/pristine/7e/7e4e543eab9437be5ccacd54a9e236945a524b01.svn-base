import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectFromSsid = () => {
  return axiosPython.request({
    url: 'collect/selectFromSsid',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addEthernet = (ethernet) => {
  return axiosPython.request({
    url: 'collect/addEthernet',
    data: {
      data:{ethernet}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateSsid = (ssid) => {
  return axiosPython.request({
    url: 'collect/updateSsid',
    data:
      {ssid},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}



export const deleteFromSsidById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteFromSsidById',
    data: {
      data: {id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

  export const updateWlanSetting = (wlan) => {
    return axiosPython.request({
      url: 'collect/updateWlanSetting',
      data:
        {wlan},
      method: 'post',
      withCredentials: true,
      contentType: 'application/json'
    })
  }


  export const selectFromWlanConfig = () => {
    return axiosPython.request({
      url: 'collect/selectFromWlanConfig',
      data: {
        data:{}
      },
      method: 'post',
      withCredentials: true,
      contentType: 'application/json'
    })
}
