import { toast } from 'react-hot-toast'

export const MessageAlert = ({ type = 0, msg, delay = 5000 }) => {
    switch (type) {
        case 1:
            toast.success(msg, { duration: delay })
            break

        case 2:
            toast.error(msg, { duration: delay })
            break

        case 3:
            toast.custom(msg, { duration: delay })
            break

        default:
            toast(msg, { duration: delay })
            break
    }
}