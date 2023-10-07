//current page = pagina actual y resident es el arreglo total de residentes en la dimension actual
 export const paginationLogic = (currentPage, residents) => {

  //si residents es vacio
  const pages = []
  if(residents.length === 0){
    return{
      pages: [1],
      residentsInPage:[]
    }
  }
  
  const RESIDENTS_PER_PAGE = 18

  //cantidad total de paginas
  const totalPages = Math.ceil(residents.length / RESIDENTS_PER_PAGE)

  //residentes que se van a mostrar en la pagina actual
  const sliceEnd = (RESIDENTS_PER_PAGE * currentPage)
  const sliceStart = sliceEnd - RESIDENTS_PER_PAGE
  const residentsInPage = residents.slice(sliceStart, sliceEnd)

  //generacion de arreglo de las paginas que se van a mostrar
  for(let i =1; i <= totalPages; i++){
    pages.push(i)
  }

  return{
    residentsInPage,
    pages,
  }

}
