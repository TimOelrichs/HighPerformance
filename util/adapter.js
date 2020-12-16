
exports.transformRating = (rating) => {
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

exports.transformProductIdToName = (id) => {
    console.log(id)
    switch (id) {
        case '9JMBMVTX2CSMHH2MA4T2TYJFL':
            return "HooverClean"
        case 'L6K68IE1QROBTH2MA4T2TYJFL':
            return "HooverGo"
        default:
            return "unknown Product"
    }
}

