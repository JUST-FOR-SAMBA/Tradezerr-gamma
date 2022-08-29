import React from "react";
import { ErrorMessage, Field } from "formik";
import textError from "./textError";

function Checkbox(props) {
    const { label, name, options, isValid, ...rest } = props
    return (
        <div className="form-control ">
            <label className="label" htmlFor={label}>{label}</label>
            <Field as='checkbox'
                name={name}
                {...rest}
                className={` ${isValid && 'input-error'} `}>
                {({ field }) => {
                    return options.map(option => {
                        return (
                            <React.Fragment key={option.key}>
                                <input type='checkbox' id={option.value} {...field} value={option.value} checked={field.value.includes(option.value)} className="checkbox checkbox-sm" />
                                <label htmlFor={option.value}>
                                    {option.key}
                                </label>
                            </React.Fragment>
                        )
                    })
                }}
            </Field>
            <ErrorMessage name={name} component={textError} />
        </div>
    );
}

export default Checkbox;
