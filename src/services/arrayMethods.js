function removeAt(index) {
    let v = this.pop();
    this[index] = v;
}

const setMethods = () => {
    Array.prototype.removeAt = removeAt;
}

export default setMethods;