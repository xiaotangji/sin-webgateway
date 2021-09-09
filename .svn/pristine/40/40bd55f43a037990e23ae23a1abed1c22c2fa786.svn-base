import {axiosPython} from "@/libs/python.request";

export const getImageList = () => {
  return axiosPython.request({
    url: 'docker/getImageList',
    data: {
      data:{}
    },
    method: 'get',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const getContainerList = () => {
  return axiosPython.request({
    url: 'docker/getContainerList',
    data: {
      data:{}
    },
    method: 'get',
    withCredentials: true,
    contentType: 'application/json'
  })
}


export const removeImage = (imageName) => {
  return axiosPython.request({
    url: 'docker/removeImage',
    data: {
      data: {imageName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const createContainer = (imageName) => {
  return axiosPython.request({
    url: 'docker/createContainer',
    data: {
      data:{imageName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const startContainer = (data) => {
  return axiosPython.request({
    url: 'docker/startContainer',
    data: {
      data:{data}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const stopContainer = (data) => {
  return axiosPython.request({
    url: 'docker/stopContainer',
    data: {
      data:{data}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const restartContainer = (data) => {
  return axiosPython.request({
    url: 'docker/restartContainer',
    data: {
      data:{data}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const removeContainer = (data) => {
  return axiosPython.request({
    url: 'docker/removeContainer',
    data: {
      data:{data}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const buildImage = (data) => {
  return axiosPython.request({
    url: 'docker/buildImage',
    data: {
      data:{data}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
