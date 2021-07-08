import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './SearchForm';
import RepositoriesList from './RepositoriesList';
import Loader from './Loader';
import PaginationRounded from './PaginationRounded';

function App() {
  const [searchRepo, setSearchRepo] = useState('');
  const [showRepos, setShowRepos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [reposPerPage] = useState(6);

  const searchHandler = (repo) => {
    setSearchRepo(repo);
    if (repo.length < 2) {
      setShowRepos(false);
      setRepos([]);
      setFilteredRepos([]);
    }
  };

  const getAllRepos = async (searchName, perPage) => {
    setLoading(true);
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${searchName}&per_page=${perPage}`
    );
    const data = await res.json();
    setRepos(data.items);
    setLoading(false);
  }

  const filterReposToShow = useCallback(() => {
    const filtered = repos.filter(repo => {
      return repo.name.toLowerCase().startsWith(searchRepo.toLowerCase());
    })
    return filtered;
  }, [searchRepo, repos])

  useEffect(() => {
    if (repos.length === 0 && searchRepo.length === 2) {
      getAllRepos(searchRepo, 100);
    }

  }, [searchRepo, repos]);

  useEffect(() => {
    if (repos.length > 0 && searchRepo.length >= 2) {
      setFilteredRepos(filterReposToShow());
      setShowRepos(true);
    }

  }, [searchRepo, repos, filterReposToShow]);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = number => setCurrentPage(number);

  return (
    <div className="container">
      <SearchForm
        onSearch={searchHandler}
        text={searchRepo}
        totalRepos={filteredRepos.length}
      />
      {
        loading
          ? <Loader />
          : <RepositoriesList
            repos={currentRepos}
            showRepos={showRepos}
            totalRepos={filteredRepos.length}
          />
      }
      <PaginationRounded
        reposPerPage={reposPerPage}
        totalRepos={filteredRepos.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
