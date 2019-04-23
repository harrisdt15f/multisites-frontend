export function array_unique3(arr) {
    const res = [];
    const json = {};
    for (let i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}
