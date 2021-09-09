import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectAllFromDeviceVariable = (id,sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectAllFromDeviceVariable',
    data: {
      data:{id,sqlStartIndex,sqlNumber,sortField,sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addDeviceVariable = (deviceVariable) => {
  return axiosPython.request({
    url: 'collect/addDeviceVariable',
    data: {
      data:{deviceVariable}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
export const deleteDeviceVariableById = (id) => {
  return axiosPython.request({
    url: 'collect/deleteDeviceVariableById',
    data: {
      data:{id}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const updateDeviceVariableById = (deviceVariable) => {
  return axiosPython.request({
    url: 'collect/updateDeviceVariableById',
    data: {
      data:{deviceVariable}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
