export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const imageResponse = fetch('https://jsonplaceholder.typicode.com/photos')
    const [posts, images] = await Promise.all([postsResponse, imageResponse])

    const postsJson = await posts.json();
    const imagesJson = await images.json();
    
    const postsAndImages = postsJson.map((post, index) => {
      return {...post, cover: "https://img.odcdn.com.br/wp-content/uploads/2023/10/conjuncao-Lua-Jupiter-768x458.jpg"}
    });

    return postsAndImages;
}