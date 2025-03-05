import{ Etcd3 } from 'etcd3';

// Etcd-Client initialisieren
const etcd = new Etcd3();

// Registriere einen Service in Etcd
export const registerService = async (serviceName : string, url : string) => {
    try {
        await etcd.put(serviceName).value(url);
        console.log(`Service ${serviceName} erfolgreich registriert.`);
    } catch (error) {
        console.error(`Fehler bei der Registrierung des Services ${serviceName}:`, error);
        throw error;
    }
};

export const getServiceUrl = async (serviceName : string) => {
    try {
        const url = await etcd.get(serviceName).string();
        if (!url) {
            console.error(`Service ${serviceName} nicht gefunden.`);
            throw new Error(`Service ${serviceName} nicht gefunden`);
        }
        return url;
    } catch (error) {
        console.error(`Fehler beim Abrufen der URL von ${serviceName}:`, error);
        throw error;
    }
};

export const deregisterService = async (serviceName : string) => {
    try {
        await etcd.delete().key(serviceName);
        console.log(`Service ${serviceName} erfolgreich abgemeldet.`);
    } catch (error) {
        console.error(`Fehler beim Abmelden des Services ${serviceName}:`, error);
        throw error;
    }
};

