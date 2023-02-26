export {
    applyFnToNum
};

function applyFnToNum(obj, fn) {
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            applyFnToNum(obj[key], fn);
        } else if (typeof obj[key] === "number") {
            obj[key] = fn(obj[key]); 
        }
    }

    return obj;
}
