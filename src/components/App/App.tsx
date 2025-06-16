import { keepPreviousData, useQuery} from "@tanstack/react-query"
import {fetchNotes } from "../../services/noteService"
import NoteList from "../NoteList/NoteList"

import css from "./App.module.css"
import { useEffect, useState } from "react"
import Pagination from "../Pagination/Pagination"
import NoteModal from "../NoteModal/NoteModal"
import SearchBox from "../SearchBox/SearchBox"
import { useDebounce } from "use-debounce"
import Loader from "../Loader/Loader"


function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)
  
  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
  });
  
  const totalPages = data?.totalPages ?? 0;
  
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={setSearchQuery} />
        {data && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />)}
        {<button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
        }
      </header>
      {isLoading && <Loader/>}
      {data && <NoteList notes={data.notes}/>}
      {isModalOpen && (
        <NoteModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App
