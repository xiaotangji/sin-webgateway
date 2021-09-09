
import {axiosPython} from "@/libs/python.request";


export const selectFromAccessControl = () => {
  return axiosPython.request({
    url: 'collect/selectFromAccessControl',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addAccessControl = (route) => {
  return axiosPython.request({
    url: 'collect/addAccessControl',
    data: {
      data:{route}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const updateAccessControl = (route) => {
  return axiosPython.request({
    url: 'collect/updateAccessControl',
    data:
      {route},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteFromAccessControlById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteFromAccessControlById',
    data: {
      data: {id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectFromAccessControlList = () => {
  return axiosPython.request({
    url: 'collect/selectFromAccessControlList',
    data: {
      data:{}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
