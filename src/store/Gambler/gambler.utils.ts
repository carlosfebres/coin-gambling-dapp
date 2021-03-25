
export function getGamblerRegistredEventFromTransactionData(transaction: any): string | undefined {
    const events = transaction.events as any[];
    const event = events.find(({event}) => event === "gamblerRegistered");
    if (event) {
        return event.args.gambler;
    }
}