import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface FormEntry {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface FormResponse {
    message: string;
    formData?: FormEntry[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<FormResponse>
) {
    const formData: FormEntry[] = getFormData();
    const dataFilePath = path.join(process.cwd(), 'data', 'formData.json');

    if (req.method === 'POST') {
        const { firstname, lastname, email, password }: FormEntry = req.body;
        const newFormEntry: FormEntry = {
            id: generateId(),
            firstname,
            lastname,
            email,
            password,
        };

        formData.push(newFormEntry);
        saveFormData(formData, dataFilePath);

        res.status(200).json({ message: 'Form data submitted successfully.' });
    } else if (req.method === 'GET') {
        res
            .status(200)
            .json({ message: 'Form data retrieved successfully.', formData });
    } else {
        res.status(404).json({ message: 'Invalid API request.' });
    }
}

function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

function getFormData(): FormEntry[] {
    const dataFilePath = path.join(process.cwd(), 'data', 'formData.json');

    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading form data file:', error);
        return [];
    }
}

function saveFormData(formData: FormEntry[], filePath: string): void {
    try {
        const fileContents = JSON.stringify(formData, null, 2);
        fs.writeFileSync(filePath, fileContents, 'utf8');
        console.log('Form data saved to file.');
    } catch (error) {
        console.error('Error saving form data to file:', error);
    }
}