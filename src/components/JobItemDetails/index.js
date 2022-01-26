import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarjobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getSimilarFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    packagePerAnnum: data.package_per_annum,
    location: data.location,
    rating: data.rating,
    title: data.title,
    skills: data.skills,
    companyWebsiteUrl: data.company_website_url,
    lifeAtCompany: data.life_at_company,
  })

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobData = this.getFormattedData(fetchedData.job_details)
      console.log(fetchedData)

      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getSimilarFormattedData(eachSimilarJob),
      )

      this.setState({
        jobData: updatedJobData,
        similarjobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  formatedSkillsList = data => ({
    name: data.name,
    imageUrl: data.image_url,
  })

  formatedCompanyLife = data => ({
    companyDescription: data.description,
    companyImageUrl: data.image_url,
  })

  renderJobDetailsSuccessView = () => {
    const {similarjobsData, jobData} = this.state
    console.log(similarjobsData)
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,

      packagePerAnnum,
      location,
      rating,
      title,
      skills,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobData
    const companyLife = this.formatedCompanyLife(lifeAtCompany)

    const skillsList = skills.map(eachSkills =>
      this.formatedSkillsList(eachSkills),
    )

    return (
      <>
        <div className="job-description-container">
          <div className="company-logo-role-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="role-container">
              <h1 className="title">{title}</h1>
              <div className="sub-container ">
                <BsFillStarFill className="start" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-type-package-container">
            <div className="location-employment-container">
              <div className="sub-container ">
                <MdLocationOn className="location-on" />
                <p className="sub-container-title">{location}</p>
              </div>
              <div className="sub-container ">
                <BsFillBriefcaseFill className="briefcase" />
                <p className="sub-container-title">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div>
            <div className="description-container">
              <h1 className="description-heading">Description</h1>

              <a href={companyWebsiteUrl} className="anchor-container">
                <p className="visit-content">Visit</p>
                <BsBoxArrowUpRight className="arrow-content" />
              </a>
            </div>

            <p className="description">{jobDescription}</p>
            <div className="skills-container">
              <h1 className="description-heading">Skills</h1>
              <ul className="skills-list">
                {skillsList.map(eachSkills => (
                  <li className="skills-container-items">
                    <img
                      src={eachSkills.imageUrl}
                      alt={eachSkills.name}
                      className="skills-url"
                    />
                    <p className="skills-title">{eachSkills.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company-container">
              <h1 className="description-heading">Life at Company</h1>
              <div className="life-at-company">
                <div className="description-container">
                  <p className="description">
                    {companyLife.companyDescription}
                  </p>
                </div>
                <img src={companyLife.companyImageUrl} alt="companyImage" />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarjobsData.map(eachJob => (
              <SimilarJobs jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-section">{this.renderJobDetailsSection()}</div>
      </>
    )
  }
}
export default JobItemDetails
