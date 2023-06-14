export class DateCalculator {
    public getDifferenceInDays(date1: Date, date2: Date) {
        const differenceInMsec = Math.abs(
            date1.getTime() - date2.getTime());

        return Math.floor(differenceInMsec / (1000 * 60 * 60 * 24));
    }
}