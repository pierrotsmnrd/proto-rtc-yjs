function simpleDiff(a: any, b: any) {
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


export default class TextAreaBinding {

    targetTextArea: any;
    yElement: any;
    _yElementObserver: any;
    _domObserver: any;

    constructor(yElement: any, domTextArea: any) {

        this.yElement = yElement
        this.targetTextArea = domTextArea

        this.yElement.observe(this.typeObserver.bind(this))
        domTextArea.addEventListener('input', this.domObserver)

    }


    typeObserver = (): any => {

        //this._mutualExclude(() => {
        // const relativeStart = getRelativePosition(textType, textarea.selectionStart)
        // const relativeEnd = getRelativePosition(textType, textarea.selectionEnd)
        this.targetTextArea.value = this.yElement.toString()
        // const start = fromRelativePosition(textType._y, relativeStart)
        // const end = fromRelativePosition(textType._y, relativeEnd)
        // textarea.setSelectionRange(start, end)
        //})
    }


    domObserver = (event: any) => {

        //this._mutualExclude(() => {
        let diff = simpleDiff(this.yElement.toString(), this.targetTextArea.value)
        this.yElement.delete(diff.pos, diff.remove)
        this.yElement.insert(diff.pos, diff.insert)
        //})
    };


    /**
     * Remove all data observers (both from the type and the target).
     */
    destroy() {

        this.yElement.unobserve(this._yElementObserver)
        this.targetTextArea.unobserve(this._domObserver)
        this.yElement = null
        this.targetTextArea = null
    }
}