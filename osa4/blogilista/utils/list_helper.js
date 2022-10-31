const dummy = (blogs) => {
    return (1)
}

const totalLikes = (blogs) => {
    const sum = blogs.map(blog => blog.likes)
       .reduce((a, b) => {return a + b})
    return (sum)
}
  
module.exports = {
    dummy,
    totalLikes,
}
