import http from '@/utlis/axi.js'

export const getUserPictures = (query) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params: query || null
  })
}
