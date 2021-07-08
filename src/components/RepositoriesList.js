import Repository from './Repository';
import PropTypes from 'prop-types'

const RepositoriesList = ({ repos, showRepos, totalRepos }) => {
  return (
    <ul className='repos-list'>
      {
        showRepos && !!totalRepos
          ? repos.map(repo => <Repository key={repo.id} repo={repo} />)
          : <li
            style={{ fontWeight: '700', justifyContent: 'center', textAlign: 'center' }}>
            No repositories found, please try to adjust your request
          </li>
      }
    </ul>
  )
}

RepositoriesList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object),
  showRepos: PropTypes.bool,
  totalRepos: PropTypes.number
}

export default RepositoriesList
