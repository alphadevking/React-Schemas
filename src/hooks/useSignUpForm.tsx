import React, { FormEvent, ChangeEvent } from 'react';

export interface FormInputs {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface ErrorMessages {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface UseSignUpFormReturnType {
    formInputs: FormInputs;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    errorMessages: ErrorMessages;
}

const useSignUpForm = (): UseSignUpFormReturnType => {
    const [errorMessages, setErrorMessages] = React.useState<ErrorMessages>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formRef = event.currentTarget; // explicit typing of form element
        const formInputs: FormInputs = {
            // access each input value from the formRef and give explicit typing
            firstname: (formRef.elements.namedItem('firstname') as HTMLInputElement).value || '',
            lastname: (formRef.elements.namedItem('lastname') as HTMLInputElement).value || '',
            email: (formRef.elements.namedItem('email') as HTMLInputElement).value || '',
            password: (formRef.elements.namedItem('password') as HTMLInputElement).value || '',
        };

        let errorMessages: ErrorMessages = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        };

        // Check if any of the form inputs is missing or invalid
        if (!formInputs.firstname.trim()) {
            errorMessages.firstname = 'First name is required.';
        }
        if (!formInputs.lastname.trim()) {
            errorMessages.lastname = 'Last name is required.';
        }
        if (!formInputs.email.trim()) {
            errorMessages.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formInputs.email)) {
            errorMessages.email = 'Invalid email address.';
        }
        if (!formInputs.password.trim()) {
            errorMessages.password = 'Password is required.';
        } else if (formInputs.password.trim().length < 8) {
            errorMessages.password = 'Password must be at least 8 characters long.';
        }

        // Display error messages to notify the user of invalid inputs
        setErrorMessages(errorMessages);

        // If there are any errors, stop the form from submitting
        if (Object.values(errorMessages).some((message) => message !== '')) {
            return;
        }

        // If no errors, submit the form
        try {
            const response = await fetch('/api/signUpForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formInputs),
            });
            if (response.ok) {
                console.log('Form data successfully submitted.');
            } else {
                console.error('Failed to submit form data.');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        }

        // Reset error messages
        setErrorMessages({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFormInputs((formInputs) => ({
            ...formInputs,
            [event.target.name]: event.target.value,
        }));
    };

    const [formInputs, setFormInputs] = React.useState<FormInputs>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    return { formInputs, handleFormSubmit, handleInputChange, errorMessages };
};

export default useSignUpForm;