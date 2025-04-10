document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    // Actualizar valor del slider
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Generar contraseña al hacer clic
    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        
        passwordInput.value = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    });

    // Copiar contraseña al portapapeles
    copyBtn.addEventListener('click', () => {
        passwordInput.select();
        document.execCommand('copy');
        alert('¡Contraseña copiada!');
    });

    // Función principal para generar contraseña
    function generatePassword(length = 12, upper = true, numbers = true, symbols = true) {
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        let password = '';

        if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        return password;
    }

    // Generar una contraseña al cargar la página
    generateBtn.click();
});