export function calculateCheckDigit(input: string): number {
    const weights = [7, 3, 1];

    const charValues = (char: string): number => {
        if (char >= '0' && char <= '9') return char.charCodeAt(0) - 48;
        if (char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 55;
        return 0; // '<' or invalid characters
    };

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += charValues(input[i]) * weights[i % 3];
    }
    return sum % 10;
}

export function generateMRZ(
    passportNumber: string,
    country: string,
    birthDate: string,
    expiryDate: string,
    lastName: string,
    firstName: string,
    sex: string
): string[] {
    passportNumber = passportNumber.padEnd(9, '<');
    let passportCheck = calculateCheckDigit(passportNumber);

    birthDate = birthDate.replace(/-/g, '').slice(2); // Convert YYYY-MM-DD to YYMMDD
    let birthCheck = calculateCheckDigit(birthDate);

    expiryDate = expiryDate.replace(/-/g, '').slice(2);
    let expiryCheck = calculateCheckDigit(expiryDate);

    let personalNumber = '<<<<<<<<<<<<'; // If no personal number
    let personalCheck = calculateCheckDigit(personalNumber);

    let finalString = passportNumber + passportCheck + country + birthDate + birthCheck + sex + expiryDate + expiryCheck + personalNumber + personalCheck;
    let finalCheck = calculateCheckDigit(finalString);

    let nameField = `${lastName}<<${firstName}`.replace(/\s/g, '<').padEnd(39, '<');

    return [
        `P<${country}${nameField}`,
        `${passportNumber}${passportCheck}${country}${birthDate}${birthCheck}${sex}${expiryDate}${expiryCheck}${personalNumber}${personalCheck}${finalCheck}`
    ];
}
