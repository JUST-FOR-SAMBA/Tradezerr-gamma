import { atom } from 'recoil'

const orderToggle = atom({
    key: 'orderToggle',
    default: 'false',
})

export default orderToggle;