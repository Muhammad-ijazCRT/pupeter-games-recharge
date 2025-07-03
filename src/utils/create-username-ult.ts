export const createUsername = async (username: string, preffix: string): Promise<string> => {
    const usernameFiltrado = username.replace(/[^a-zA-Z]/g, '');

    let usernameModificado = usernameFiltrado;
    if (usernameFiltrado.length < 4) {
        // Duplicar y luego cortar el username para obtener máximo 6 caracteres
        usernameModificado = (usernameFiltrado.repeat(2)).substring(0, 8);
    }

    // Generar un número aleatorio de 4 dígitos
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);

    return `${usernameModificado}${preffix}${numeroAleatorio}`;
};