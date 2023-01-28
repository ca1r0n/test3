export function insertArr<T>(arr: Array<T>, el: T, index: number): Array<T> {
    return [
        ...arr.slice(0, index),
        el,
        ...arr.slice(index, arr.length),
    ]
}

export function deleteArr<T>(arr: Array<T>, index: number): Array<T> {
    return [
        ...arr.slice(0, index),
        ...arr.slice(index + 1, arr.length),
    ]
}

export function filterTree<T extends { child: (T | null)[] }>(tree: T | null, f: (a: T) => boolean): T | null {
    if (!tree || !f(tree)) {
        return null
    }

    for (let i = 0; i < tree.child.length; i++) {
        tree.child[i] = filterTree(tree.child[i], f)
    }

    return tree
}

export function mapTree<T extends { child: (T | null)[] }>(tree: T | null, f: (a: T) => T): T | null {
    tree = tree && f(tree)

    if (tree) {
        for (let i = 0; i < tree.child.length; i++) {
            tree.child[i] = mapTree(tree.child[i], f)
        }
    }

    return (tree)
}

export function countTree<T extends { child: (T | null)[] }>(tree: T | null): number {
    if (tree == null) {
        return 0
    }

    let count = 1

    for (let i = 0; i < tree.child.length; i++) {
        count += countTree(tree.child[i])
    }

    return count
}

export function heightTree<T extends { child: (T | null)[] }>(tree: T | null): number {
    if (tree == null) {
        return 0
    }

    const arr = []

    for (let i = 0; i < tree.child.length; i++) {
        arr.push(heightTree(tree.child[i]))
    }

    return 1 + Math.max(0, ...arr)
}