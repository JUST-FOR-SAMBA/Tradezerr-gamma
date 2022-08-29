import React from "react";
import { ErrorMessage, Field } from "formik";
import textError from "./textError";

function Select(props) {
    const { label, name, options, isValid, ...rest } = props
    return (
        <div className="form-control">
            <label className="label" htmlFor={label}>
                <span className="label-text">{label}</span>
            </label>
            <Field as="select"
                id={name}
                name={name}

                {...rest}
                className={` ${isValid && 'input-error'} select  `}>
                {options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component={textError} />
        </div>
    );
}

export default Select;
