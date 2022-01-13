

class ValidatingMethods {


    getValidTsxs = async (tsxs: any[]) => {

        const dataset: any[] = await tsxs.length ? tsxs?.slice()?.sort((a: any, b: any) => a?.tsx_id - b?.tsx_id) : [];
        
        let arry: any[] = [];

        if (dataset?.length) {
            
            for await ( let [i, element] of dataset?.entries() ) {

                const previous_object = await dataset?.[i - 1]?.current_hash?.toString()
                const current_object = await element?.previous_hash?.toString()

                const previous_saved = await arry[arry?.length - 1]?.current_hash;

                if ((element.previous_hash === previous_saved) || ((element?.previous_hash !== element?.current_hash) && ( i ? current_object === previous_object : true ))) {

                    
                    arry = [...arry, element]

                }

            }
            
            return arry; // dataset?.filter((element: any, index: number) => (element.to_project_id !== undefined) && (element.previous_hash !== element.current_hash) && ( index ? element?.previous_hash?.toString() === dataset?.[index - 1]?.current_hash?.toString() : true ))

        } else {

            return [];

        }

        
    };

    
}
export default ValidatingMethods;