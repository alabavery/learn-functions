import subjectFunction from '../myFunction'

export const parse = val => {
    if (val === 'true') {
        return true
    }
    if (val === 'false') {
        return false
    }
    if (!Number.isNaN(parseFloat(val))) {
        return parseFloat(val)
    }
    if (val === '') {
        return undefined
    }
    if (val === 'null') {
        return null
    }
    return val
}   

const getParamNames = f => {
    const paramStart = f.indexOf("(") + 1
    const paramEnd = f.indexOf(")")
    const paramString = f.slice(paramStart, paramEnd)
    return paramString.split(", ")
}

export const functionDisplay = params => {
    let stringFunc = subjectFunction.toString()
    const paramNames = getParamNames(stringFunc)

    for (let i = 0; i < paramNames.length; i++) {
        const finalArgument = typeof parse(params[i]) === 'string' ? "'" + params[i] + "'" : params[i]
        let  newFuncString = ''
        while (true) {
            newFuncString = stringFunc.replace(paramNames[i], finalArgument || 'undefined')
            if (newFuncString === stringFunc) {
                break
            }
            stringFunc = newFuncString
        }
    }
    return stringFunc
}

export const functionCall = (args) => {
    return subjectFunction(...args)
}

export const functionName = () => {
    return subjectFunction.name
}