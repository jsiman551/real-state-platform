import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "../../types";
import { useState } from "react";
import Alert from "../alert";

// Validation schema
const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required."),
    email: yup
        .string()
        .email("Please enter a valid Email.")
        .required("Email is required."),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, "Phone Number must contain only numbers.")
        .required("Phone Number is required."),
    comments: yup.string().required("Comments cannot be empty."),
});

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const [showNotification, setShowNotification] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (_data: FormValues) => {
        setShowNotification(true);
        reset(); // Reset form after submission

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    return (
        <div className="flex-1 ml-0 md:ml-8">
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">Contact Agent</h3>

            {/* Success Notification */}
            {showNotification && (
                <Alert type="success" message="Message sent successfully!" className="mb-4" />
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name *"
                        {...register("fullName")}
                        className={`input input-bordered w-full ${errors.fullName ? "input-error" : ""}`}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email *"
                        {...register("email")}
                        className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Phone Number *"
                        {...register("phoneNumber")}
                        className={`input input-bordered w-full ${errors.phoneNumber ? "input-error" : ""}`}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                </div>
                <div>
                    <textarea
                        placeholder="Comments *"
                        {...register("comments")}
                        className={`textarea textarea-bordered w-full ${errors.comments ? "textarea-error" : ""}`}
                        rows={3}
                    ></textarea>
                    {errors.comments && (
                        <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                >
                    Contact Now
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
