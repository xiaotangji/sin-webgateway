import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectFromEthernetByName = (name) => {
  return axiosPython.request({
    url: 'collect/selectFromEthernetByName',
    data: {
      data:{name}
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

export const updateEthernetByName = (ethernet) => {
  return axiosPython.request({
    url: 'collect/updateEthernetByName',
    data:
      {ethernet},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectFromSlaveIpConfig = () => {
  return axiosPython.request({
    url: 'collect/selectFromSlaveIpConfig',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
export const addSlaveIp = (slave) => {
  return axiosPython.request({
    url: 'collect/addSlaveIp',
    data: {
      data:{slave}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateSlaveIpById = (slave) => {
  return axiosPython.request({
    url: 'collect/updateSlaveIpById',
    data:
      {slave},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteSlaveById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteSlaveById',
    data: {
      data:{id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
