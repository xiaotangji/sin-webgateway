
import {axiosPython} from "@/libs/python.request";


export const selectAllFromDevice = (deviceName,sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectAllFromDevice',
    data: {
      data:{deviceName,sqlStartIndex,sqlNumber,sortField,sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectJsonFromDeviceByDeviceName = (deviceName) => {
  return axiosPython.request({
    url: 'collect/selectJsonFromDeviceByDeviceName',
    data: {
      data:{deviceName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName = (deviceName) => {
  return axiosPython.request({
    url: 'collect/selectJsonUpdateJsonRpcJsonFromDeviceByDeviceName',
    data: {
      data:{deviceName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const addDevice = (device) => {
  return axiosPython.request({
    url: 'collect/addDevice',
    data: {
      data:{device}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteDeviceByDeviceName = (deviceName) => {
  return axiosPython.request({
    url: 'collect/deleteDeviceByDeviceName',
    data: {
      data:{deviceName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateDeviceByDeviceName = (device) => {
  return axiosPython.request({
    url: 'collect/updateDeviceByDeviceName',
    data: {
      data:{device}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updateRequestByDeviceName = (device) => {
  return axiosPython.request({
    url: 'collect/updateRequestByDeviceName',
    data: {
      data:{device}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
