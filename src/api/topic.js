import { axios } from '@/libs/api.request'
import {axiosPython} from "@/libs/python.request";

export const selectAllFromTopic = (sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectAllFromTopic',
    data: {
      data:{sqlStartIndex,sqlNumber,sortField,sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const addTopic = (topic) => {
  return axiosPython.request({
    url: 'collect/addTopic',
    data: {
      data:{topic}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteFromTopicByTopicName = (topicName) => {
  return axiosPython.request({
    url: 'collect/deleteFromTopicByTopicName',
    data: {
      data:{topicName}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}
export const updateTopicByTopicName = (topic) => {
  return axiosPython.request({
    url: 'collect/updateTopicByTopicName',
    data: {
      data:{topic}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

