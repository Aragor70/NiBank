


const fibGenerate = (a, b) => {

    let arry = []

    let counted = b
    
    for (let i = 1; i <= 100; i++) {

        arry = [...arry, counted]

        counted = a + b

        a = b

        b = counted
        
    }

    return arry
    

}

console.log(fibGenerate(0, 1))
