

class SortingMethods {


    quickSort = ( arry: any[], key: string = '' ): any[] => {

        if (arry.length <= 1) return arry;
    
        const is_object = ((typeof arry[arry.length - 1] === 'object') && key)
    
        const pivot = arry[arry.length - 1];
    
        let leftSide: any[] = [];
        let rightSide: any[] = [];
        
        for (let i = 0; i < arry.length - 1; i++) {
    
            if ((is_object ? arry[i].num < pivot.num : arry[i] < pivot)) {
                leftSide = [...leftSide, arry[i]];
            } else {
                rightSide = [...rightSide, arry[i]];
            }
    
        }
        if (is_object) {
            return [...this.quickSort(leftSide, key), pivot, ...this.quickSort(rightSide, key)];
        } else {
            return [...this.quickSort(leftSide), pivot, ...this.quickSort(rightSide)];
        }
    
    }


}

export default SortingMethods;