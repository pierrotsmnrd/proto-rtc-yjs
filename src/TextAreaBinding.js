function simpleDiff(a, b) {
    let left = 0 // number of same characters counting from left
    let right = 0 // number of same characters counting from right
    while (left < a.length && left < b.length && a[left] === b[left]) {
        left++
    }
    if (left !== a.length || left !== b.length) {
        // Only check right if a !== b
        while (right + left < a.length && right + left < b.length && a[a.length - right - 1] === b[b.length - right - 1]) {
            right++
        }
    }
    return {
        pos: left, // TODO: rename to index (also in type above)
        remove: a.length - left - right,
        insert: b.slice(left, b.length - right)
    }
}

function typeObserver() {

    //this._mutualExclude(() => {
    const textarea = this.target
    const textType = this.type
    // const relativeStart = getRelativePosition(textType, textarea.selectionStart)
    // const relativeEnd = getRelativePosition(textType, textarea.selectionEnd)
    textarea.value = textType.toString()
    // const start = fromRelativePosition(textType._y, relativeStart)
    // const end = fromRelativePosition(textType._y, relativeEnd)
    // textarea.setSelectionRange(start, end)
    //})
}

function domObserver() {

    //this._mutualExclude(() => {
    let diff = simpleDiff(this.type.toString(), this.target.value)
    this.type.delete(diff.pos, diff.remove)
    this.type.insert(diff.pos, diff.insert)
    //})
}



export default class TextAreaBinding {

    constructor(textType, domTextArea) {

        this.type = textType
        this.target = domTextArea
        // this._mutualExclude = createMutualExclude()

        // set initial value
        domTextArea.value = textType.toString()
        // Observers are handled by this class
        this._typeObserver = typeObserver.bind(this)
        this._domObserver = domObserver.bind(this)
        textType.observe(this._typeObserver)
        domTextArea.addEventListener('input', this._domObserver)
    }

    /**
     * Remove all data observers (both from the type and the target).
     */
    destroy() {

        this.type.unobserve(this._typeObserver)
        this.target.unobserve(this._domObserver)
        this.type = null
        this.target = null
    }
}