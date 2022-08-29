import React from 'react'
import Checkbox from './checkbox'
import Input from './input'
import RadioButtons from './radioButtons'
import Select from './select'
import Textarea from './textarea'

function FormikControl(props) {
    const { control, ...rest } = props
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Select {...rest} />
        case 'checkbox': return <Checkbox {...rest} />
        case 'radio': return <RadioButtons {...rest} />
        default: return null
    }
}

export default FormikControl