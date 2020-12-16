
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
