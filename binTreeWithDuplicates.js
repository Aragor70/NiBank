


class Tree {

    constructor () {

        this.root = null;

    }

    addValue = ( value ) => {

        const n = new Node(value)

        if (this.root === null) {

            this.root = n;

        } else {

            this.root.addNode(n)

        }
    }
}

class Node {

    constructor (value) {

        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 0;

    }

    addNode = ( n ) => {

        if (n.value < this.value) {

            if (this.left === null) {
                this.left = n;
            } else {
                this.left.addNode(n)
            }
            
        } else if (n.value > this.value) {

            
            if (this.right === null) {
                this.right = n;
            } else {
                this.right.addNode(n)
            }

        } else {

            this.count += 1


        }


    }
}

const setup = () => {


    const tree = new Tree;

    tree.addValue(5)
    tree.addValue(3)
    tree.addValue(4)
    tree.addValue(6)
    tree.addValue(6)
    console.log(tree)

}

setup()