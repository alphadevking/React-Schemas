import React from 'react';
import formInputs from './formInputs.json';

interface FormInputs {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface FormElements extends HTMLFormControlsCollection {
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
}

type Event = React.FormEvent<HTMLFormElement & { elements: FormElements }>;

const useSignUpForm = (): {
    formInputs: FormInputs,
    handleFormSubmit: (event: Event) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} => {

    const handleFormSubmit = (event: Event): void => {
        event.preventDefault();

        const formInputs: FormInputs = {
            firstname: event.currentTarget.elements.firstname.value || '',
            lastname: event.currentTarget.elements.lastname.value || '',
            email: event.currentTarget.elements.email.value || '',
            password: event.currentTarget.elements.email.value || '',
        };

        console.log(
            `Your name is: ${formInputs.firstname} ${formInputs.lastname} and your email address is: ${formInputs.email}`
        );

        setFormInputs(formInputs);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setFormInputs((formInputs) => ({
            ...formInputs,
            [event.target.name]: event.target.value
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
