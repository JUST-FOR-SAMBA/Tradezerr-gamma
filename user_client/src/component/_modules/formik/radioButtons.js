import React from "react";
import { ErrorMessage, Field } from "formik";
import textError from "./textError";

function RadioButtons(props) {
    const { label, name, isValid, options, ...rest } = props
    return (
        <div className="form-control    ">
            <label className="label " htmlFor={label}>
                <span className="label-text">{label}</span>
            </label>
            <Field

                name={name}

                {...rest}
            >
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.key} >
                                    <div className=" ">
                                        <input type='radio' id={option.value} {...field} value={option.value} checked={field.value === option.value} />
                                        <label htmlFor={option.value}>{option.key}</label>

                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={textError} />
        </div>
    );
}

export default RadioButtons;
