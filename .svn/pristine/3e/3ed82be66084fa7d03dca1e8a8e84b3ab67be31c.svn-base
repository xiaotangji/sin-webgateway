import { axios } from '@/libs/api.request'
import { getToken } from '../libs/util'
import {axiosPython} from "@/libs/python.request";

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const selectAllFromUser = (sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axiosPython.request({
    url: 'collect/selectAllFromUser',
    data: {
      data:{sqlStartIndex, sqlNumber, sortField, sortType}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectFromUserByUserNameAndPassword = (user) => {
  return axiosPython.request({
    url: 'collect/selectFromUserByUserNameAndPassword',
    data: {
      data:{user}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}




export const addUser = (user) => {
  return axiosPython.request({
    url: 'collect/addUser',
    data: {
      data:{user}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const deleteFromUserByUserName = (user_name) => {
  return axiosPython.request({
    url: 'collect/deleteFromUserByUserName',
    data: {
      data:{user_name}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const updatePasswordByUserName = (user) => {
  return axiosPython.request({
    url: 'collect/updatePasswordByUserName',
    data: {
      data:{user}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const getCompany = (name) => {
  return axios.request({
    url: '/getCompany',
    params: {
      name
    },
    method: 'get',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const selectCompanyByAddress = (address) => {
  return axios.request({
    url: '/selectCompanyByAddress',
    headers: {
      "token": getToken()
    },
    data: {
      data:{address}
    },
    method: 'post',
    withCredentials: true,
    contentType: 'application/json'
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}



