export const CapFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
    return capitalized
}