import { axios } from '@/libs/api.request'

export const selectFromSfjhQcbhByCphm = (cphm, sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axios.request({
    url: 'Sdkc/selectFromSfjhQcbhByCphm',
    params: {
      cphm, sqlStartIndex, sqlNumber, sortField, sortType
    },
    method: 'get'
  })
}
// 根据searchValue查询sfjhqcbh以及在线情况
export const selectFromSfjhQcbhBysearchValue = (searchKey, searchValue) => {
  return axios.request({
    url: 'Sdkc/selectFromSfjhQcbhBysearchValue',
    params: {
      searchKey, searchValue
    },
    method: 'get'
  })
}
export const selectAllSfjhQcbh = () => {
  return axios.request({
    url: 'Sdkc/selectAllSfjhQcbh',
    method: 'get'
  })
}

export const selectFromCarType = (cllx, sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axios.request({
    url: 'Sdkc/selectFromCarType',
    params: {
      cllx, sqlStartIndex, sqlNumber, sortField, sortType
    },
    method: 'get'
  })
}

export const addSfjhQcbh = tbSfjhqcbh => {
  return axios.request({
    url: 'Sdkc/addToSfjhQcbh',
    method: 'post',
    data: {
      tbSfjhqcbh
    }
  })
}

export const addToCarType = tbCarType => {
  return axios.request({
    url: 'Sdkc/addToCarType',
    method: 'post',
    data: {
      tbCarType
    }
  })
}

export const updateSfjhQcbhByCphm = tbSfjhqcbh => {
  return axios.request({
    url: 'Sdkc/updateSfjhQcbhByCphm',
    method: 'post',
    data: {
      tbSfjhqcbh
    }
  })
}

export const updateCarTypeByCllx = tbCarType => {
  return axios.request({
    url: 'Sdkc/updateCarTypeByCllx',
    method: 'post',
    data: {
      tbCarType
    }
  })
}

export const deleteSfjhQcbhByCphm = cphm => {
  return axios.request({
    url: 'Sdkc/deleteFromSfjhQcbhByCphm',
    method: 'post',
    params: {
      cphm
    }
  })
}
export const deleteFromCarTypeByCllx = cllx => {
  return axios.request({
    url: 'Sdkc/deleteFromCarTypeByCllx',
    method: 'post',
    params: {
      cllx
    }
  })
}
export const queryBeforeDeleteFromSfjhqcbhByCllx = cllx => {
  return axios.request({
    url: 'Sdkc/queryBeforeDeleteFromSfjhqcbhByCllx',
    method: 'get',
    params: {
      cllx
    }
  })
}
