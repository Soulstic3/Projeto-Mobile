export function cepApplyMask(value: string) {
    return value.replace(/^(\d{5})(\d{3})$/, "$5-$3")
}