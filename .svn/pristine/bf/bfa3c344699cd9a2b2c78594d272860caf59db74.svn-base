import { axios } from '@/libs/api.request'

export const selectFromSbcs = (searchKey, searchVal, sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axios.request({
    url: 'Sdkc/selectFromSbcsByQcbh',
    params: { searchKey, searchVal, sqlStartIndex, sqlNumber, sortField, sortType },
    method: 'get'
  })
}
export const updateSbcsByEntity = (tbSbcsJson) => {
  return axios.request({
    url: 'Sdkc/updateSbcsByEntity',
    data: { tbSbcsJson },
    method: 'post'
    // contentType: 'application/json'
  })
}
export const updateSbcs = (clbh) => {
  return axios.request({
    url: 'Sdkc/updateSbcs',
    params: { clbh },
    method: 'get'
    // contentType: 'application/json'
  })
}
