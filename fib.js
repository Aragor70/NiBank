


const fib = (a, b) => {

    let arry = []
    let counted = b

    for (let i = 0; i < 100; i++) {

        arry = [...arry, counted]

        counted = a + b

        a = b

        b = counted

    }

    return arry

}

console.log(fib(0, 1))

