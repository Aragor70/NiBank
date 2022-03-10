



class Tree {

    constructor () {

        this.root = null;
        
    }

    addValue = ( value ) => {

        const n = new Node(value)

        if (this.root === null) {
            this.root = n;
        } else {

            this.root.addNode( n )

        }

    }

    sort = () => {

        if (this.root !== null) {

            this.root.visit()

        }

    }

    find = (value) => {

        
        if (this.root !== null) {

            return this.root.searchFor(value);

        }

    }



}


class Node {
    constructor (value) {

        this.value = value;
        this.left = null;
        this.right = null;
        
    }

    addNode = ( n ) => {

        if ( n.value < this.value) {

            if (this.left === null) {
                this.left = n;
            } else {
                this.left.addNode(n)
            }
            

        } else if ( n.value > this.value) {

            if (this.right === null) {
                this.right = n;
            } else {
                this.right.addNode(n)
            }
            
        }

    }

    visit = () => {

        if (this.left !== null) {
            this.left.visit()

        }

        console.log(this.value)

        
        if (this.right !== null) {
            this.right.visit()
        }


    }
    searchFor = ( value ) => {

        if (value === this.value) {

            return this;

        } else if (value < this.value && this.left !== null) {
        
            return this.left.searchFor(value)

        } else if (value > this.value && this.right !== null) {

            return this.right.searchFor(value)

        } else {

            return value + " not found";

        }
        

    }
    

}

let tree = null;

const setup = () => {

    tree = new Tree();


    tree.addValue( 5 )

    tree.addValue( 3 )
    
    tree.addValue( 2 )

    tree.addValue( 4 )

    tree.addValue( 7 )

    tree.addValue( 1 )

    console.log(tree.find(1))

}

setup()