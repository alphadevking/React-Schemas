import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface FormInputs {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface RequestBody {
    formInputs: FormInputs;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { formInputs } = req.body as RequestBody;
            console.log('formInputs:', formInputs);

            // Generate unique id for the form input
            const formInputFilePath = path.join(process.cwd(), 'data', 'formInputs.json');
            const formData = JSON.parse(await fs.promises.readFile(formInputFilePath, 'utf-8'));
            const lastId = formData.reduce((maxId: number, formInput: FormInputs) => Math.max(maxId, formInput.id), 0);
            const formInputWithId = {
                ...formInputs,
                id: lastId + 1,
            };

            await fs.promises.writeFile(formInputFilePath, JSON.stringify([...formData, formInputWithId]), 'utf-8');

            console.log(formData)

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
