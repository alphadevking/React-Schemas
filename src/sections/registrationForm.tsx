import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
    .object({
        firstName: z.string().min(1, { message: "Firstname is required" }),
        lastName: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters long" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
        terms: z.literal(true, {
            errorMap: () => ({ message: "You must accept Terms and Conditions" }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });

type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleTogglePasswordConfirm = () => {
        setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

    return (
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                    >
                        First Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <p className="text-xs italic text-red-500"> {errors.firstName?.message}
                        </p>
                    )}
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                    >
                        Last Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <p className="text-xs italic text-red-500"> {errors.lastName?.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-xs italic text-red-500"> {errors.email?.message}
                    </p>
                )}
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-6 md:mr-1 relative">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="absolute -bottom-4 text-xs italic text-red-500 mt-2"> {errors.password?.message}
                        </p>
                    )}
                    <div className="absolute inset-y-0 top-[45%] text-lg right-3 flex items-center">
                        {showPassword ? (
                            <FaEyeSlash
                                className="text-gray-500 cursor-pointer"
                                onClick={handleTogglePassword}
                            />
                        ) : (
                            <FaEye
                                className="text-gray-500 cursor-pointer"
                                onClick={handleTogglePassword}
                            />
                        )}
                    </div>
                </div>
                <div className="mb-6 md:ml-1 relative">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="c_password"
                    >
                        Confirm Password
                    </label>
                    <input
                        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${errors.confirmPassword && "border-red-500"}`}
                        id="c_password"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="absolute -bottom-4 text-xs italic text-red-500 mt-2"> {errors.confirmPassword?.message}
                        </p>
                    )}
                    <div className="absolute inset-y-0 top-[45%] text-lg right-3 flex items-center">
                        {showPasswordConfirm ? (
                            <FaEyeSlash
                                className="text-gray-500 cursor-pointer"
                                onClick={handleTogglePasswordConfirm}
                            />
                        ) : (
                            <FaEye
                                className="text-gray-500 cursor-pointer"
                                onClick={handleTogglePasswordConfirm}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="my-6 select-none">
                <input type="checkbox" id="terms" {...register("terms")}/>
                <label
                    htmlFor="terms"
                    className={`ml-2 mb-2 text-sm font-bold ${errors.terms ? "text-red-500" : "text-gray-700"
                    }`}
                >
                    Accept Terms & Conditions
                </label>
                {errors.terms && (
                    <p className="text-xs italic text-red-500"> {errors.terms?.message}
                    </p>
                )}
            </div>
            <div className="mb-6 text-center">
                <button
                    className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register Account
                </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center my-1">
                <a
                    className="inline-block text-sm text-gray-500 align-baseline hover:text-gray-800"
                    href="#"
                >
                    Forgot Password?
                </a>
            </div>
            <div className="text-sm text-center flex gap-x-3 justify-center">
                <span className="italic opacity-75">Already have an account?</span>
                <a
                    className="text-gray-400 align-baseline hover:text-gray-500 hover:underline"
                    href="#"
                >
                    Login!
                </a>
            </div>
        </form>
    );
};

export default Form;