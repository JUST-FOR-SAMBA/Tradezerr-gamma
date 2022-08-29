import React from "react";
import { ErrorMessage, Field } from "formik";
import textError from "./textError";

function Textarea(props) {
    const { label, name, isValid, placeholder, ...rest } = props
    return (
        <div className="form-control">
            <label className="label" htmlFor={label}>
                <span className="label-text">{label}</span>
            </label>
            <Field as='textarea'
                id={name}
                name={name}
                placeholder={placeholder}

                {...rest}
                className={` ${isValid && 'input-error'} textarea textarea-bordered text-[16px] `} />
            <ErrorMessage name={name} component={textError} />
        </div>
    );
}

export default Textarea;
