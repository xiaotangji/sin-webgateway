import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectAllFromCon = (conName,sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectAllFromCon',
    data: {
      data:{conName,sqlStartIndex,sqlNumber,sortField,sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteConByconName = (conName) => {
  return axiosPython.request({
    url: 'collect/deleteConByconName',
    data: {
      data:{conName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
export const addCon = (connector) => {
  return axiosPython.request({
    url: 'collect/addCon',
    data: {
      data:{connector}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateConByName = (connector) => {
  return axiosPython.request({
    url: 'collect/updateConByName',
    data:
     {connector},
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

