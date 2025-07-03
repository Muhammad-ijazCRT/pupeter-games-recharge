export const PORT = process.env.PORT;
export const ENV = process.env.env;

//*! GROUP 2
export const URL_SBS_ACE_BOOK = process.env.URL_SBS_ACE_BOOK;
export const URL_SBS_GOLDEN_CITY = process.env.URL_SBS_GOLDEN_CITY;
export const URL_SBS_ULTRA_PANDA = process.env.URL_SBS_ULTRA_PANDA;
export const URL_SBS_V_POWER = process.env.URL_SBS_V_POWER;
export const URL_SBS_X_GAMES = process.env.URL_SBS_X_GAMES;

//*! DLQ
export const URL_SBS_DLQ_CREATE_ACCOUNT = process.env.URL_SBS_DLQ_CREATE_ACCOUNT;
export const SBS_NAME_DLQ_CREATE_ACCOUNT = process.env.SBS_NAME_DLQ_CREATE_ACCOUNT;

export const URL_SBS_DLQ_MOVEMENTS = process.env.URL_SBS_DLQ_MOVEMENTS;
export const SBS_NAME_DLQ_MOVEMENTS = process.env.SBS_NAME_DLQ_MOVEMENTS;

//*!AWS CONFIGURATIONS
export const AWS_REGION = process.env.AWS_REGION;

//** Config enviroment to local, qa, etc */
interface ServiceOptions {
    port: number;
    host?: string;
}

export const configOptions = (): ServiceOptions => {
    const port = parseInt(PORT, 10);
    const host = process.env.HOST;

    let options: ServiceOptions = {
        port
    };

    if (host && (ENV === 'production' || ENV === 'qa')) {
        options = { ...options, host };
    }

    return options;
};


export const configOptionsMicroservices = (serviceName: string): ServiceOptions => {
    const portKey = `SERVICE_${serviceName.toUpperCase()}_PORT`;
    const hostKey = `SERVICE_${serviceName.toUpperCase()}_HOST`;

    const port = parseInt(process.env[portKey], 10);

    const host = process.env[hostKey];

    let options: ServiceOptions = {
        port
    };

    if (host && (ENV === 'production' || ENV === 'qa')) {
        options = { ...options, host };
    }

    return options;
};