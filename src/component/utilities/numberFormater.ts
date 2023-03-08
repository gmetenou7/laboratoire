export function formatNumber(number: string) {
    return (Math.round(parseInt(number) * 100) / 100).toFixed(2)
}