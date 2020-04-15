// Build logger MW

// can also call the function with variables using different params & 
// Switch statements

module.exports = (format) => {
return (req, res, next) => {
    switch(format) {
        case 'short': 
          console.log(`${req.method} ${req.ur}`)
          break // keeps it from going to other cases
        case 'long' : 
        default: // if no param specified
         console.log(`${new Date().toISOString()} ${req.ip} ${req.method}${req.url}`)
        break
      }
     next()
  }   
}

