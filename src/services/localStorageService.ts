export class LocalStorageService {
    static saveValue<T> (key: string, value: T) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
            return ;
        }
        catch (error) {
            console.log (error);
            return false;
        }
    }
    static getValue(key: string) {
        const value = localStorage.getItem(key);
        if (!value) return undefined;
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }

    }
}