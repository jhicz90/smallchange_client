import { toast } from 'react-hot-toast'

export const MessageAlert = ({ type = 0, content, delay = 5000 }) => {
    switch (type) {
        case 1:
            toast(content, { duration: delay })
            break

        case 2:
            toast.success(content, { duration: delay })
            break

        case 3:
            toast.error(content, { duration: delay })
            break

        case 4:
            toast.custom(content, { duration: delay })
            break

        default:
            toast(content, { duration: delay })
            break
    }
}