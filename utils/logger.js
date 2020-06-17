const info=(...params) => { 
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

const dir = (...params) => {
    console.error(...params)
}

module.exports={
    info,
    error,
    dir
}