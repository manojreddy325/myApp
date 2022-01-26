import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="content-container">
        <h1 className="home-heading">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="home-description">
          Millions of people are searching for jobs
        </p>
        <div>
          <Link to="/Jobs">
            <button type="button" className="home-job-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
