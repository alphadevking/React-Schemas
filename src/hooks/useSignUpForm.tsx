import React, { FormEvent, ChangeEvent } from 'react';

export interface FormInputs {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface UseSignUpFormReturnType {
    formInputs: FormInputs;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const useSignUpForm = (): UseSignUpFormReturnType => {
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

        console.log(
            `Your name is: ${formInputs.firstname} ${formInputs.lastname} and your email address is: ${formInputs.email}`
        );
        
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

        setFormInputs(formInputs);

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

    return { formInputs, handleFormSubmit, handleInputChange };

};

export default useSignUpForm;
