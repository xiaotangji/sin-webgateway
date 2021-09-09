import axios from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";
export const getRouterReq = (access) => {
  return axios.request({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}

export const selectFromRoutingStatic = (sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectFromRoutingStatic',
    data: {
      data:{sqlStartIndex, sqlNumber, sortField, sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addRoutingStatic = (route) => {
  return axiosPython.request({
    url: 'collect/addRoutingStatic',
    data: {
      data:{route}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const updateRoutingStatic = (route) => {
  return axiosPython.request({
    url: 'collect/updateRoutingStatic',
    data:
      {route},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteFromRoutingStaticById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteFromRoutingStaticById',
    data: {
      data: {id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
