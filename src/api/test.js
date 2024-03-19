import request from '@/utils/request'

// 测试
export function getTest(query) {
  return request({
    url: '/test/list',
    method: 'get',
    params: query,
  })
}
