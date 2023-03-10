import React, { useState } from 'react';

interface FormInputs {
    [key: string]: string;
}

type Event = React.FormEvent<HTMLFormElement>;

const useSignUpForm = (): {
    formInputs: FormInputs,
    handleFormSubmit: (event: Event) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} => {

    const [formInputs, setFormInputs] = useState<FormInputs>({});

    const handleFormSubmit = (event: Event): void => {
        event.preventDefault();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setFormInputs((formInputs) => ({
            ...formInputs,
            [event.target.name]: event.target.value
        }));
    };

    return { formInputs, handleFormSubmit, handleInputChange };
};

export default useSignUpForm;