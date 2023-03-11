import { FormInputs } from '../../../data/types';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
    formInputs: FormInputs[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { formInputs } = req.body as RequestBody;
            console.log('formInputs:', formInputs);

            // Generate unique id for each form input
            const formInputFilePath = '/api/formInputs.json';
            const existingFormInputs: FormInputs[] = await fetch(formInputFilePath)
                .then(res => res.json())
                .catch(() => []);

            const lastId = existingFormInputs.reduce((maxId: number, formInput: FormInputs) => Math.max(maxId, formInput.id), 0);

            const formInputsWithIds = formInputs.map((formInput, i) => ({
                ...formInput,
                id: lastId + i + 1,
            }));

            await fetch(formInputFilePath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([...existingFormInputs, ...formInputsWithIds])
            });

            console.log('Form data successfully written to file.');
            res.status(200).json({ message: 'Form data successfully submitted.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to write form data to file.' });
        }
    } else {
        res.status(404).json({ error: 'API route not found.' });
    }
};

export default handler;
