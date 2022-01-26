import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
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
          <p className="description-heading">Description</p>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobsCard
