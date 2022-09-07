// 普通提示
const toast = (title, duration = 3000) => {
  uni.showToast({
    title,
    icon: 'none',
    duration
  })
}

// 错误提示
toast.err = (title, duration = 3000) => {
  uni.showToast({
    title,
    icon: 'error',
    duration
  })
}

// 成功提示
toast.succes = (title, duration = 3000) => {
  uni.showToast({
    title,
    icon: 'succes',
    duration
  })
}

export default toast
