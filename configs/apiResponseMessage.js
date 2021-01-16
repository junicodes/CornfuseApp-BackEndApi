
const error501 = (err) => {
    return {
        status: false,
        message: `An unexpected error ocurred while performing request, 
                  please refresh and try again, or contact admin support!`,
        hint: err
    }
}



module.exports = {
    error501
}