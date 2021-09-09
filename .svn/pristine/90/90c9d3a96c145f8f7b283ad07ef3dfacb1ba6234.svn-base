import { axios } from '@/libs/api.request'

export const selectTreeOfSfjhQcbh = () => {
  return axios.request({
    url: 'Sdkc/selectTreeOfSfjhQcbh',
    method: 'get'
  })
}
export const getCurrentCan = (qcbh) => {
  return axios.request({
    url: 'Sdkc/getCurrentCan',
    params: { qcbh },
    method: 'get'
  })
}
export const getHistoryCan = (searchKey, searchValue, startTime, endTime) => {
  return axios.request({
    url: 'Sdkc/selectFromTBxXsbMbByTime',
    params: { searchKey, searchValue, startTime, endTime },
    method: 'get'
  })
}
export const selectStaticDataBySearchValue = (searchKey, searchValue, sqlStartIndex, sqlNumber, sortField, sortType) => {
  return axios.request({
    url: 'Sdkc/selectStaticDataBySearchValue',
    params: { searchKey, searchValue, sqlStartIndex, sqlNumber, sortField, sortType },
    method: 'get'
  })
}
export const getNewOneCldrFromCldrBySearchValue = (searchKey, searchValue) => {
  return axios.request({
    url: 'Sdkc/getNewOneCldrFromCldrBySearchValue',
    params: { searchKey, searchValue },
    method: 'get'
  })
}
// 根据 汽车编号 去查最近的登入等处
export const getNewOneCldrFromCldr = (qcbh) => {
  return axios.request({
    url: 'Sdkc/selectNewOneFromCldrByVin',
    params: { qcbh },
    method: 'get'
  })
}
