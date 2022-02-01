



const quickSort = ( arry ) => {

    if (arry.length === 1) {
        return arry;
    }

    const pivot = arry[arry.length - 1].num

    let leftSide = [];
    let rightSide = [];
    for (let i = 0; i < arry.length - 1; i++) {

        if (arry[i].num < pivot) {
            leftSide = [...leftSide, arry[i]]
        } else {
            rightSide = [...rightSide, arry[i]]
        }

    }

    if (leftSide.length > 0 && rightSide.length > 0) {

        return [...quickSort(leftSide), arry[arry.length - 1], ...quickSort(rightSide)]

    } else if (leftSide.length > 0) {
        return [...quickSort(leftSide), arry[arry.length - 1]]
    } else {
        return [arry[arry.length - 1], ...quickSort(rightSide)]
    }

}


const array = [ {num: 1}, {num: 4}, {num: 2}, {num: 8}, {num: 345}, {num: 123}, {num: 43}, {num: 32}, {num: 5643}, {num: 63}, {num: 123}, {num: 43}, {num: 2},{num: 55}, {num: 1}, {num: 234}, {num: 92} ];


console.log(quickSort(array))


var start = new Date().getTime();

for (i = 0; i < 50000; ++i) {
// do something
}

var end = new Date().getTime();
var time = end - start;
alert('Execution time: ' + time);