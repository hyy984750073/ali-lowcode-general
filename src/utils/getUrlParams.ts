// 获取当前页面
export const getSearchParam = (paramName = 'page') => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName)
}