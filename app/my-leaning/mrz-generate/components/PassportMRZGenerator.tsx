// PassportMRZGenerator.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface PassportData {
    documentType: string;
    country: string;
    surname: string;
    givenNames: string;
    documentNumber: string;
    nationality: string;
    birthDate: string;
    sex: string;
    expiryDate: string;
    optionalData1: string;
    optionalData2: string;
}

interface Country {
    name: {
        common: string;
    };
    cca3: string;
}

const PassportMRZGenerator = () => {

    const [passportData, setPassportData] = useState<PassportData>({
        documentType: 'P',
        country: 'CHN',
        surname: 'DNTSHRW',
        givenNames: 'NOHUN',
        documentNumber: 'K42K7YISL',
        nationality: 'CHN',
        birthDate: '860526',
        sex: 'F',
        expiryDate: '281114',
        optionalData1: 'ZE184226B',
        optionalData2: '',
    });

    const [mrzCode, setMrzCode] = useState<string>('');
    const [selectedDocType, setSelectedDocType] = useState<string>("Passport(TD3)");
    const [countries, setCountries] = useState<Country[]>([]);

    // Fetch countries data
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // Generate MRZ code when passport data changes
    useEffect(() => {
        generateMRZ();
    }, [passportData]);

    const generateMRZ = () => {
        // First line of MRZ for TD3 format
        const line1 = `P<${passportData.country}${passportData.surname}<<${passportData.givenNames}${'<'.repeat(39 - (passportData.country.length + passportData.surname.length + passportData.givenNames.length + 2))}`;

        // Second line of MRZ for TD3 format
        let line2 = `${passportData.documentNumber}${passportData.country}${passportData.birthDate}${passportData.sex}${passportData.expiryDate}`;

        // Add remaining characters and optional data
        const fillerLength = 42 - line2.length;
        line2 += '<'.repeat(fillerLength) + '06';

        setMrzCode(`${line1}\n${line2}`);
    };

    const handleInputChange = (field: keyof PassportData, value: string) => {
        setPassportData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getRandomCountry = () => {
        if (countries.length === 0) return { cca3: 'CHN' };
        return countries[Math.floor(Math.random() * countries.length)];
    };

    // Random name generation
    const maleFirstNames = ['JOHN', 'JAMES', 'ROBERT', 'MICHAEL', 'WILLIAM', 'DAVID', 'RICHARD', 'JOSEPH', 'THOMAS', 'CHARLES'];
    const femaleFirstNames = ['MARY', 'PATRICIA', 'JENNIFER', 'LINDA', 'ELIZABETH', 'BARBARA', 'SUSAN', 'JESSICA', 'SARAH', 'KAREN'];
    const lastNames = ['SMITH', 'JOHNSON', 'WILLIAMS', 'BROWN', 'JONES', 'GARCIA', 'MILLER', 'DAVIS', 'RODRIGUEZ', 'MARTINEZ'];

    const getRandomName = (sex: string) => {
        const firstName = sex === 'M' ?
            maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)] :
            femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return { firstName, lastName };
    };

    const handleRandomData = () => {
        // Generate random sex
        const sex = Math.random() > 0.5 ? 'M' : 'F';

        // Get random country
        const randomCountry = getRandomCountry();

        // Get random name based on sex
        const { firstName, lastName } = getRandomName(sex);

        // Generate random document number
        const randomDocNumber = 'A' + Math.floor(10000000 + Math.random() * 90000000).toString();

        setPassportData({
            ...passportData,
            surname: lastName,
            givenNames: firstName,
            sex: sex,
            country: randomCountry.cca3,
            nationality: randomCountry.cca3,
            documentNumber: randomDocNumber,
            birthDate: generateRandomDate(1950, 2000),
            expiryDate: generateRandomDate(2025, 2035),
            optionalData1: generateRandomString(9),
        });
    };

    const generateRandomDate = (startYear: number, endYear: number) => {
        const year = Math.floor(startYear + Math.random() * (endYear - startYear));
        const month = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
        const day = Math.floor(1 + Math.random() * 28).toString().padStart(2, '0');

        return `${year.toString().slice(2)}${month}${day}`;
    };

    const generateRandomString = (length: number) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const recognizeMRZ = () => {
        // In a real application, this would use OCR or other technologies
        // to recognize MRZ from an image
        alert('MRZ recognition feature would be implemented with OCR technology');
    };

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Passport(TD3)">Passport(TD3)</SelectItem>
                        <SelectItem value="ID-Card(TD1)">ID-Card(TD1)</SelectItem>
                        <SelectItem value="Visa(TD2)">Visa(TD2)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Label htmlFor="documentType" className='mb-3'>Document type</Label>
                    <Input
                        id="documentType"
                        value={passportData.documentType}
                        onChange={(e) => handleInputChange('documentType', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="birthDate" className='mb-3' >Birth date</Label>
                    <Input
                        id="birthDate"
                        value={passportData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="nationality" className='mb-3'>Nationality</Label>
                    <Input
                        id="nationality"
                        value={passportData.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                    <Label htmlFor="country" className='mb-3'>Country</Label>
                    <Input
                        id="country"
                        value={passportData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="sex" className='mb-3'>Sex</Label>
                    <Input
                        id="sex"
                        value={passportData.sex}
                        onChange={(e) => handleInputChange('sex', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="surname" className='mb-3'>Surname</Label>
                    <Input
                        id="surname"
                        value={passportData.surname}
                        onChange={(e) => handleInputChange('surname', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                    <Label htmlFor="documentNumber" className='mb-3'>Document number</Label>
                    <Input
                        id="documentNumber"
                        value={passportData.documentNumber}
                        onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="expiryDate" className='mb-3'>Expiry date</Label>
                    <Input
                        id="expiryDate"
                        value={passportData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="givenNames" className='mb-3'>Given names</Label>
                    <Input
                        id="givenNames"
                        value={passportData.givenNames}
                        onChange={(e) => handleInputChange('givenNames', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <Label htmlFor="optionalData1" className='mb-3'>Optional data 1</Label>
                    <Input
                        id="optionalData1"
                        value={passportData.optionalData1}
                        onChange={(e) => handleInputChange('optionalData1', e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="optionalData2" className='mb-3'>Optional data 2</Label>
                    <Input
                        id="optionalData2"
                        value={passportData.optionalData2}
                        onChange={(e) => handleInputChange('optionalData2', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex space-x-4 mt-6">
                <Button variant="default" onClick={handleRandomData}>
                    Random
                </Button>
                <Button variant="default" onClick={generateMRZ}>
                    Generate
                </Button>
            </div>

            <div className="mt-6">
                <Textarea
                    value={mrzCode}
                    readOnly
                    className="h-24 font-mono"
                />
            </div>

            <Card className="mt-8 max-w-2xl mx-auto">
                <CardContent className="p-6">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold mb-4">Passport</h2>
                        <div className="flex">
                            <div className="w-1/3 bg-amber-700 rounded-full h-40 w-32 flex items-center justify-center">
                                {/* Placeholder silhouette */}
                            </div>
                            <div className="pl-4 space-y-2">
                                <div>
                                    <div className="text-sm text-gray-500">Type</div>
                                    <div className="font-bold">{passportData.documentType}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Passport number</div>
                                    <div className="font-bold">{passportData.documentNumber}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Surname</div>
                                    <div className="font-bold">{passportData.surname}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Given names</div>
                                    <div className="font-bold">{passportData.givenNames}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Date of birth</div>
                                    <div className="font-bold">
                                        {`${passportData.birthDate.substring(4, 6)}/${passportData.birthDate.substring(2, 4)}/${passportData.birthDate.substring(0, 2)}`}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Sex</div>
                                    <div className="font-bold">{passportData.sex}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Date of expiry</div>
                                    <div className="font-bold">
                                        {`${passportData.expiryDate.substring(4, 6)}/${passportData.expiryDate.substring(2, 4)}/${passportData.expiryDate.substring(0, 2)}`}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Issuing country</div>
                                    <div className="font-bold">{passportData.country}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 font-mono text-xs">
                            {mrzCode}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6 text-center">
                <Button variant="default" onClick={recognizeMRZ}>
                    Recognize MRZ
                </Button>
            </div>
        </div>
    );
};

export default PassportMRZGenerator;