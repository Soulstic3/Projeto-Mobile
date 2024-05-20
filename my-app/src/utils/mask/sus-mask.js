export function susApplyMask(value: string) {
    return value.replace(/^(\d{3})(\d{4})(\d{4})(\d{4})$/, "$1.$2.$3.$4")
}