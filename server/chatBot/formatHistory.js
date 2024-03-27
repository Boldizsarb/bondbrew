

export function formatConvHistory(messages) {
    return messages.map((message, i) => {
        if (i % 2 === 0){
            return `Human: ${message}`
        } else {
            return `AI: ${message}`
        }
    }).join('\n')
}


// Logic: Human speaks first, then AI hence all the odd numbers are human and all the even numbers are AI