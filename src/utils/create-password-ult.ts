export const createPassword = async (username: string): Promise<string> => {
    const usernameFiltrado = username.replace(/[^a-zA-Z]/g, '');

    let usernameModificado = usernameFiltrado;
    if (usernameFiltrado.length < 4) {
        // Duplicar y luego cortar el username para obtener máximo 6 caracteres
        usernameModificado = (usernameFiltrado.repeat(2)).substring(0, 6);
    }

    // Desordenar las letras del username cortado
    const letrasDesordenadas = usernameModificado.split('').sort(() => 0.5 - Math.random()).join('');

    // Generar un número aleatorio de 4 dígitos
    const numeroAleatorio = Math.floor(Math.random() * 9000 + 1000); // Esto generará un número entre 1000 y 9999

    // Unir el username desordenado y el número aleatorio
    return letrasDesordenadas + numeroAleatorio;
};