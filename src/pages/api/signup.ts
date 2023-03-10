import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

type FormInputs = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

const formInputFilePath = path.join(process.cwd(), 'public', 'formInputs.json');

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method === 'POST') {
        const formInputs: FormInputs = JSON.parse(req.body);

        fs.writeFile(formInputFilePath, JSON.stringify(formInputs), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to write form data to file.' });
            } else {
                console.log('Form data successfully written to file.');
                res.status(200).json({ message: 'Form data successfully submitted.' });
            }
        });
    } else {
        res.status(404).json({ error: 'API route not found.' });
    }
};

export default handler;
