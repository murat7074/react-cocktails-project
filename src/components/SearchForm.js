import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const {setSearchTerm} = useGlobalContext()

  const searchValue = React.useRef("")

  React.useEffect(()=>{ // burayı tam olarak anlamadım
    searchValue.current.focus()
  },[])

  const searchCocktail = ()=>{
    setSearchTerm(searchValue.current.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

{/*  NOT: input a yazılan her datayı "useRef" yani "searchValue" ile alıyorum ve "setSearchTerm" e aktarıyorum.
yazdığım değer buradan "context.js" de "searchTerm" e aktarılıyor ve Api url uzantısına ekleniyor */} 

  return (
    <section className='section search'>
            <form className='search-form' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" id="name" ref={searchValue} onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}
export default SearchForm
