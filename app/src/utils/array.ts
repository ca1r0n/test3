

export function array<T>(arr: Array<T>, el: T, index: number): Array<T> {
    return [
        ...arr.slice(0, index),
        el,
        ...arr.slice(index, arr.length),
    ]
}

export function deleteArr<T>(arr: Array<T>, index: number): Array<T> {
    return [
        ...arr.slice(0, index),
        ...arr.slice(index+1, arr.length),
    ]
}