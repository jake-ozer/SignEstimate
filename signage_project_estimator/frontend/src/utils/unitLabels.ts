const MM_PER_INCH = 25.4;

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

/** Converts mm to inches as a reduced fraction, e.g. 6 -> 1/4", 38.1 -> 1 1/2" */
export function mmToInchFraction(mm: number, maxDenominator = 16): string {
    const totalParts = Math.round((mm / MM_PER_INCH) * maxDenominator);

    if (totalParts === 0) return `0"`;

    const whole = Math.floor(totalParts / maxDenominator);
    let numerator = totalParts % maxDenominator;
    let denominator = maxDenominator;

    // Reduce the fraction (4/16 -> 1/4)
    const divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;

    if (numerator === 0) return `${whole}"`;
    if (whole === 0) return `${numerator}/${denominator}"`;
    return `${whole} ${numerator}/${denominator}"`;
}

/** Returns a label like: 6 mm (1/4") */
export function unitLabel(mm: number | string): string {
    const value = Number(mm);
    if (Number.isNaN(value)) return "";
    return `${value} mm (${mmToInchFraction(value)})`;
}