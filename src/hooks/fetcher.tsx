const fetcher = (url: string, params: object): Promise<any> => fetch(url, params).then(res => {
    if (!res.ok) {
        throw new Error('Something went wrong')
    }
    
    return res.json()
})

export default fetcher