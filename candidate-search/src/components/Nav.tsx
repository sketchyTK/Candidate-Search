 import { Link, useLocation } from 'react-router-dom';
  const currentPage = useLocation().pathname;
  const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <div>
          <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Candidate Search</Link>
        </div>
        <div>
          <Link to="/portfolio" className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}>Saved Candidates</Link>
        </div>
    </div>
  )
};

export default Nav;
