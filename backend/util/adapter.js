
const transformRating = (rating) => {
    switch (rating) {
        case 3:
            return "good"
        case 2:
            return "very good"
        case 1:
            return "execellent"
        default:
            return "unknow accountRating"
    }
} 

const transformProductIdToName = (id) => {
    //console.log(id)
    switch (id) {
        case '9JMBMVTX2CSMHH2MA4T2TYJFL':
            return "HooverClean"
        case 'L6K68IE1QROBTH2MA4T2TYJFL':
            return "HooverGo"
        default:
            return "unknown Product"
    }
}


const transformSalesObject = (sales) => {
    let result = {};
    for (let index = 0; index < sales.customers.length; index++) {
        for (const pos of sales.positions[index]) {
            if (result[pos.productName]) {
                    result[pos.productName].push({
                        clientName: sales.customers[index].clientName,
                        clientRating:  sales.customers[index].clientRating,
                        items: pos.items,
                    })
            } else {
                result[pos.productName] = []
                result[pos.productName].push({
                        clientName: sales.customers[index].clientName,
                        clientRating:  sales.customers[index].clientRating,
                        items: pos.items,
                    })
                }
            }
        }
    return result;
    }



exports.adapter = {
    transformRating,
    transformProductIdToName,
    transformSalesObject
}