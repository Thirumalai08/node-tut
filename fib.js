const series = (n) => {
    let fib = [0,1]
    let data = []
    for(let i=2;i<=n;i++) {
        fib[i] = fib[i - 2] + fib[i - 1]
        data.push(fib[i])
    }
    return data
}
console.log(series(10))
