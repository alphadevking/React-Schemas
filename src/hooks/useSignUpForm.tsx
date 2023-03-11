import React from 'react';

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

    const handleFormSubmit = async (event: Event): Promise<void> => {
        event.preventDefault();

        const formInputs: FormInputs = {
            firstname: event.currentTarget.elements.firstname.value || '',
            lastname: event.currentTarget.elements.lastname.value || '',
            email: event.currentTarget.elements.email.value || '',
            password: event.currentTarget.elements.password.value || '',
        };

        console.log(
            `Your name is: ${formInputs.firstname} ${formInputs.lastname} and your email address is: ${formInputs.email}`
        );

        setFormInputs(formInputs);

        try {
            const response = await fetch('/api/signup', {
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
            console.error(error);
        }
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
