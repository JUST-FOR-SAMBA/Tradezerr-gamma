import React from "react";
import { ErrorMessage, Field } from "formik";
import textError from "./textError";

function Input(props) {
    const { label, name, placeholder, className, isValid, ...rest } = props
    return (
        <div className="form-control">
            <label className="label" htmlFor={label}>
                <span className="label-text font-medium">{label}</span>
            </label>
            <Field
                id={name}
                name={name}
                placeholder={placeholder}
                {...rest}
                className={className}

            />
            <ErrorMessage name={name} component={textError} />
        </div>
    );
}

export default Input;
