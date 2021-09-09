import { axios } from '@/libs/api.request'

export const selectUpdatedProgramIsExistEd = (filename) => {
  return axios.request({
    url: 'program/selectUpdatedProgramIsExistEd',
    params: { filename },
    method: 'get'
  })
}
export const selectCxmcFromCxglByLxAndPch = (lx, pch) => {
  return axios.request({
    url: 'program/selectCxmcFromCxglByLxAndPch',
    params: { lx, pch },
    method: 'get'
  })
}
export const getUpdatedProgram = (pch, lx, page, limit, sort, order) => {
  return axios.request({
    url: 'program/getUpdatedProgram',
    params: { pch, lx, page, limit, sort, order },
    method: 'get'
    // contentType: 'application/json'
  })
}
export const getUploadedProgram = (pch, lx, page, limit, sort, order) => {
  return axios.request({
    url: 'program/getUploadedProgram',
    params: { pch, lx, page, limit, sort, order },
    method: 'get'
    // contentType: 'application/json'
  })
}
export const uploadProgram = (formData) => {
  return axios.request({
    url: 'program/uploadProgram',
    data: formData,
    method: 'post',
    contentType: 'multipart/form-data'
    // contentType: 'application/x-www-form-urlencoded'
  })
}
export const updateProgram = (wgbhlist, programName, updateTime) => {
  return axios.request({
    url: 'program/updateProgram',
    params: { wgbhlist, updateTime, programName },
    method: 'post'
  })
}
