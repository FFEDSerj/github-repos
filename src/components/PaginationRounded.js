import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 0,
    },
  },
}))

const PaginationRounded = ({ reposPerPage, totalRepos, paginate }) => {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }

  const clickHandler = e => {
    const value = Number(e.target.textContent);
    if (!isNaN(value)) {
      paginate(value);
    }
  };

  return (
    <div className={classes.root}>
      <Pagination
        onClick={clickHandler}
        count={pageNumbers.length}
        variant="outlined"
        shape="rounded"
        hidePrevButton
        hideNextButton
      />
    </div>
  )
}

PaginationRounded.propTypes = {
  reposPerPage: PropTypes.number,
  totalRepos: PropTypes.number,
  paginate: PropTypes.func,
}

export default PaginationRounded;
