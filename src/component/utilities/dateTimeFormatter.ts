import { parseISO, format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function dateTimeToPeriod(dateTime: string) {
    if (dateTime) {
        let date = parseISO(dateTime);
        let timePeriod = formatDistanceToNow((date), { locale: fr });
        return timePeriod;
    }
}

export function formatDateTime(dateTime: string, useUnderscore: boolean = false) {
    if (dateTime) {
        let date = parseISO(dateTime);
        let dateFormat: any = null;
        if (useUnderscore) {
            dateFormat = format(new Date(date), "dd-MM-yyyy")
        } else {
            dateFormat = format(new Date(date), "dd/MM/yyyy")
        }
        return dateFormat;
    }
}