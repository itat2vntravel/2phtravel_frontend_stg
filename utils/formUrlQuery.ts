import qs from "query-string";

interface FormUrlQueryOptions {
    params: string;
    key?: string;
    value?: string;
    keysToRemove?: string[];
}

export function formUrlQuery({
    params,
    key,
    value,
    keysToRemove,
}: FormUrlQueryOptions): string {
    const currentUrl = qs.parse(params);

    if (keysToRemove) {
        keysToRemove.forEach((keyToRemove) => {
            delete currentUrl[keyToRemove];
        });
    } else if (key && value) {
        currentUrl[key] = value;
    }

    return qs.stringifyUrl(
        { url: window.location.pathname, query: currentUrl },
        { skipNull: true }
    );
}
