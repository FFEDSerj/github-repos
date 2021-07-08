import { GoStar } from '@react-icons/all-files/go/GoStar';
import { GiForkKnifeSpoon } from '@react-icons/all-files/gi/GiForkKnifeSpoon';
import PropTypes from 'prop-types'


const Repository = ({ repo: { name, html_url, forks, stargazers_count } }) => {
  return (
    <li>
      <a href={html_url} className='repos-name'>{name}</a>
      <div className="repos-box">
        <span className="repos-number repos-stars">
          <GoStar style={{ color: '#bada55', marginRight: "5px" }} />
          <span className="repos-text">{stargazers_count}</span>
        </span>
        <span className="repos-number repos-forks">
          <GiForkKnifeSpoon style={{ color: 'grey', marginRight: "5px" }} />
          <span className="repos-text">{forks}</span>
        </span>
      </div>
    </li>
  )
}

Repository.propTypes = {
  name: PropTypes.string,
  html_url: PropTypes.string,
  forks: PropTypes.number,
  stargazers_count: PropTypes.number,
}

export default Repository;
