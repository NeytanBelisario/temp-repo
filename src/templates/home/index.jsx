import { Component, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input'

export class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 8,
    searchValue: ""
  };

  async componentDidMount() {
    const { page, postsPerPage } = this.state
    const postsAndImages = await loadPosts();
    this.setState({
      posts: postsAndImages.slice(page, postsPerPage),
      allPosts: postsAndImages,
    })
  }

  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage;
    const final = nextPage + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, final)
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage })
  }

  render() {
    const { page, postsPerPage, allPosts, posts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? allPosts.filter(posts => {
      return posts.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
          <Input onChange={this.handleChangeText} searchValue={searchValue} />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <h2>Não Existem Posts</h2>
        )}
        <div className='button-container'>
          {!!searchValue || (
            < Button disabled={noMorePosts} text='Load More Posts' onClick={this.loadMorePosts} />
          )}
        </div>
      </section>
    );
  }
}

// function App() {
//   const [state, setState] = useState({name: 'Neytan', counter: 0});

//   const handlepclick = () => {
//     setState({name: 'Sanny'})
//   }

//   const handleaclick = (evt) => {
//     evt.preventDefault()
//     const {counter} = state
//     setState({counter: counter + 1})
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p onClick={handlepclick}>
//           {state.name} {state.counter}
//         </p>
//         <a
//           onClick={handleaclick}
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

