import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup";
import LocalStorage from "../../../helpers/localStorage";
import Service from "../../../services";
import ENDPOINTS from "../../../services/endpoints";
import textError from "../../_modules/formik/textError";
import { AlertV, CheckV } from "../../_modules/_vetors";

const SignUpComponent = () => {



    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState()

    const initialValues = {
        email: "",
        password: ""
    }
    console.log(errors)

    const validate = Yup.object({
        email: Yup.string().label("email").required().email(),
        password: Yup.string().label("password").required("Password is required!"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        const { error, data } = await Service.post(ENDPOINTS.LOGIN, values);
        setErrors(error)
        setLoading(false);
        if (data) {
            LocalStorage.setToken(data.accessToken);
            return navigate(0);
        }
        setLoading(false)
    }

    return (
        <div className='grid md:grid-cols-2'>
            <div className="text-gray-800 hidden bg-gray-200  rounded-md m-8 p-8 md:block">
                <p className="text-2xl  text-center">Tradezerr.com</p>
                <ul className="text-gray-800 mt-12">
                    <li className="flex items-center mt-4 space-x-4">
                        <CheckV className="text-4xl" />
                        <p>Buy Stocks, see your money Increased</p>
                    </li>
                    <li className="flex items-center mt-4 space-x-4">
                        <CheckV className="text-4xl" />
                        <p>Powerfull Live Chart Data</p>
                    </li>
                    <li className="flex items-center mt-4 space-x-4">
                        <CheckV className="text-4xl" />
                        <p>Manage your portfolio, Easly.</p>
                    </li>
                </ul>
            </div>
            <div className="p-12">
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validate}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="form-control">
                                    <label className="label" htmlFor="email">
                                        <span className="label-text">Email address <label className="text-red-500">*</label></span>
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        className={`input input-group-lg text-black input-bordered ${(formik.errors.email && !formik.dirty) && "input-error"
                                            }`}
                                    />
                                    <ErrorMessage name="email" component={textError} />
                                </div>

                                <div className="form-control">
                                    <label className="label" htmlFor="password">
                                        <span className="label-text">Password <label className="text-red-500">*</label></span>
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        autoComplete="password"
                                        className={`input text-black input-group-lg input-bordered ${(formik.errors.password && !formik.dirty) && "input-error"
                                            }`}
                                    />
                                    <ErrorMessage name="password" component={textError} />
                                </div>

                                <div className={`text-sm flex items-center space-x-3 p-2 ${errors ? "alert-error" : "hidden"} mt-4 `}>
                                    <AlertV className="text-xl m-2" />
                                    <p className="">{errors}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty && !loading)}
                                    className={`p-2 mt-6 rounded-lg  ${loading || !formik.isValid ? " p-2  btn-disabled" : " bg-[#2e6a5cf2]"
                                        } w-full`}
                                >
                                    {loading ? (
                                        <p className=" text-gray-500 animate animate-pulse">
                                            Loading...
                                        </p>
                                    ) : (
                                        <p className="text-gray-200">
                                            Sign in
                                        </p>
                                    )}
                                </button>

                            </Form>
                        )
                    }}

                </Formik>
            </div>
        </div>
    )
}

export default SignUpComponent