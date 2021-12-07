import React, { useEffect,useContext } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link,useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';



import useStyles from './styles';

const Paginate = ({ page }) => {
  

  const classes = useStyles();
  const {getPosts,numberOfPages}= useContext(GlobalContext);
  const location=useLocation();
  useEffect(() => {
    if (page) {
      getPosts(page);
    }
  }, [page,location]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;