var garden = [[0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 0, 1]]
var result = [],safeWay = [];
function findSafeWay(arr, col) {
    if (col == arr.length) {
        var res = safeWay.slice();
        result.push(res);
        return false;
    }
    for (let row = 0; row < arr[col].length; row++)
        if (arr[col][row] == 0) {
            safeWay.push(row);
            if (findSafeWay(arr, col + 1))
                return true;
            safeWay.pop();;
        }
    return false;
}
findSafeWay(garden, 0)


