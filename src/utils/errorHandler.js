import { notification } from 'antd'

export const defaultErr = (payload, descriptionOnly = false) => {
  notification.destroy()
  return Object.keys(payload).map(key => notification.error({
    message: (descriptionOnly === false ? key.toUpperCase() : ''),
    description: payload[key],
    duration: 20
  }))
}
