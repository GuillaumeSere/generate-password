import { useState, useRef } from 'react';
import zxcvbn from 'zxcvbn';
import { IoDocumentsOutline } from 'react-icons/io5'

function PasswordGenerator() {
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordColor, setPasswordColor] = useState('black');

    const passwordInputRef = useRef(null);


    const generatePassword = () => {
        let charset = '';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_-+={}[]|:;"<>,.?/~`';

        let generatedPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(generatedPassword);
        const passwordInfo = zxcvbn(generatedPassword);
        setPasswordStrength(passwordInfo.score);
        setPasswordColor(['red', 'orange', 'yellow', 'green', 'blue'][passwordInfo.score]);
    };

    const copyToClipboard = () => {
        passwordInputRef.current.select();
        document.execCommand('copy');
    };

    const handleLengthChange = (event) => {
        setPasswordLength(parseInt(event.target.value));
        generatePassword();
    };

    const handleIncludeLowercaseChange = () => {
        setIncludeLowercase(!includeLowercase);
        generatePassword();
    };

    const handleIncludeUppercaseChange = () => {
        setIncludeUppercase(!includeUppercase);
        generatePassword();
    };

    const handleIncludeNumbersChange = () => {
        setIncludeNumbers(!includeNumbers);
        generatePassword();
    };

    const handleIncludeSymbolsChange = () => {
        setIncludeSymbols(!includeSymbols);
        generatePassword();
    };

    return (
        <div className='container'>
            <h1>Generateur Mots de Passe</h1>
                <label>
                    Longueur du mot de passe :
                    <input
                        type="range"
                        className='range-input'
                        min="8"
                        max="64"
                        value={passwordLength}
                        onChange={handleLengthChange}
                    />
                    {passwordLength}
                </label>
                <div className="card-label">
                <label>
                    Inclure des minuscules
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={includeLowercase}
                        onChange={handleIncludeLowercaseChange}
                    />
                </label>
                <label>
                    Inclure des majuscules
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={includeUppercase}
                        onChange={handleIncludeUppercaseChange}
                    />
                </label>
                <label>
                    Inclure des chiffres
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={includeNumbers}
                        onChange={handleIncludeNumbersChange}
                    />
                </label>
                <label>
                    Inclure des symboles
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={includeSymbols}
                        onChange={handleIncludeSymbolsChange}
                    />
                </label>
            </div>
            <button className='btn-password' onClick={generatePassword}>Générer un mot de passe</button>
            {password && (
                <div className='result'>
                    <label className='label-result'>
                        Mot de passe généré :
                        <input type="text" value={password} ref={passwordInputRef} readOnly />
                        <button onClick={copyToClipboard}><IoDocumentsOutline /></button>
                    </label>
                    <div>
                        Cote de force du mot de passe : {passwordStrength}/4
                        <div style={{ color: passwordColor, marginTop: ".5rem" }}>
                            {' '}
                            {['Très faible', 'Faible', 'Moyenne', 'Forte', 'Très forte'][passwordStrength]}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PasswordGenerator;