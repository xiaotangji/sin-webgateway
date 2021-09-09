import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectFromDhcp = () => {
  return axiosPython.request({
    url: 'collect/selectFromDhcp',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addDhcp = (dhcp) => {
  return axiosPython.request({
    url: 'collect/addDhcp',
    data: {
      data:{dhcp}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateDhcp = (dhcp) => {
  return axiosPython.request({
    url: 'collect/updateDhcp',
    data:
      {dhcp},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}



export const deleteFromDhcpById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteFromDhcpById',
    data: {
      data: {id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const selectFromStaticIpConfig = () => {
  return axiosPython.request({
    url: 'collect/selectFromStaticIpConfig',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addStaticIpConfig = (staticIp) => {
  return axiosPython.request({
    url: 'collect/addStaticIpConfig',
    data: {
      data:{staticIp}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const updateStaticIpconfig = (staticIp) => {
  return axiosPython.request({
    url: 'collect/updateStaticIpconfig',
    data:
      {staticIp},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteFromStaticIpConfigById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteFromStaticIpConfigById',
    data: {
      data: {id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
