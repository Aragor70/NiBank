

const generateArry = (length) => {


    let arry = [];

    for (let i = 0; i <= length; i++) {


        arry = [...arry, {num: Math.floor(Math.random() * 55)}]


    }

    
    return arry;

}


const quickSort = ( arry, key = '' ) => {

    if (arry.length <= 1) return arry;

    const is_object = ((typeof arry[arry.length - 1] === 'object') && key)

    const pivot = arry[arry.length - 1];

    let leftSide = [];
    let rightSide = [];
    
    for (let i = 0; i < arry.length - 1; i++) {

        if ((is_object ? arry[i][key] < pivot[key] : arry[i] < pivot)) {
            leftSide = [...leftSide, arry[i]];
        } else {
            rightSide = [...rightSide, arry[i]];
        }

    }
    if (is_object) {
        return [...quickSort(leftSide, key), pivot, ...quickSort(rightSide, key)];
    } else {
        return [...quickSort(leftSide), pivot, ...quickSort(rightSide)];
    }

}

const start = new Date().getTime();
//console.log(generateArry(10))
console.log(quickSort(/* ['a', 'd', 'c', 'd', 'b', ] */ generateArry(10), 'num'))

const end = new Date().getTime();

console.log('Executing time ' + (end - start) + ' ms ' + '= ' + ((end - start) * 0.001) + ' seconds')