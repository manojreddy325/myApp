import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobsCard from '../JobsCard'
import FilterGroup from '../FilterGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    onSearch: '',

    activeSalaryRange: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    packagePerAnnum: data.package_per_annum,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeSalaryRange, onSearch} = this.state

    console.log(activeSalaryRange)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=${activeSalaryRange}&search=${onSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJobDetails =>
        this.getFormattedData(eachJobDetails),
      )
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  updateSalaryRange = salary => {
    this.setState(
      {
        activeSalaryRange: salary,
      },
      this.getJobsData,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    console.log(searchInput)
    this.setState({onSearch: searchInput}, this.getJobsData())
  }

  renderJobsListView = () => {
    const {jobsList, searchInput} = this.state

    return (
      <div className="all-jobs-main-container">
        <div className="search-input-container">
          <input
            type="search"
            className="input-search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            testid="searchButton"
            className="search-input-icon-button"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="all-jobs-container ">
          {jobsList.map(eachJob => (
            <JobsCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-sections">
          <div className="filters-group-container">
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              updateSalaryRange={this.updateSalaryRange}
              searchInput={searchInput}
              onChangeSearchInput={this.onChangeSearchInput}
              onClickSearchButton={this.onClickSearchButton}
            />
          </div>

          {this.renderAllJobList()}
        </div>
      </>
    )
  }
}

export default Jobs
