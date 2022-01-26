import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: '',
  }

  componentDidMount = () => {
    this.getProfileData()
  }

  getFormattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = this.getFormattedData(fetchedData.profile_details)
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div>
        <img className="profile-img" src={profileImageUrl} alt={name} />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  onClickSearchButtonFilterGroup = () => {
    const {onClickSearchButton} = this.props
    onClickSearchButton()
  }

  onChangeSearchInputFilterGroup = event => {
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(event)
  }

  renderSearchInput = () => {
    const {searchInput} = this.props
    return (
      <div className="search-input-container-filter-group ">
        <input
          type="search"
          className="input-search-filter-group "
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInputFilterGroup}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-input-icon-button-filter-group "
          onClick={this.onClickSearchButtonFilterGroup}
        >
          <BsSearch className="search-icon-filter-group " />
        </button>
      </div>
    )
  }

  renderCheckBoxContainer = () => {
    const {employmentTypesList} = this.props

    const onChangeCheckBox = event => {
      console.log(event.target)
    }

    return (
      <div className="checkbox-group-container">
        <h1 className="check-box-heading">Type of Employment</h1>
        <ul className="checkbox-group">
          {employmentTypesList.map(eachEmploymentType => (
            <li
              className="checkbox-container"
              key={eachEmploymentType.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachEmploymentType.employmentTypeId}
                onChange={onChangeCheckBox}
                value={eachEmploymentType.employmentTypeId}
              />
              <label className="label-text">{eachEmploymentType.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderRadioButtonContainer = () => {
    const {salaryRangesList, updateSalaryRange} = this.props

    const onChangeRadioButton = event => {
      updateSalaryRange(event.target.value)
    }

    return (
      <div className="radio-button-group-container">
        <h1 className="radio-button-heading">Salary Range</h1>
        <ul className="radio-button-group">
          {salaryRangesList.map(eachsalaryRangesType => (
            <li
              className="radio-button-container"
              key={eachsalaryRangesType.salaryRangeId}
            >
              <input
                type="radio"
                id={eachsalaryRangesType.salaryRangeId}
                onChange={onChangeRadioButton}
                value={eachsalaryRangesType.salaryRangeId}
                name="salary"
              />
              <label className="label-text">{eachsalaryRangesType.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.renderSearchInput()}
        <div className="profile-container">{this.renderProfileContainer()}</div>
        <hr className="horizontal-line" />
        {this.renderCheckBoxContainer()}
        <hr className="horizontal-line" />
        {this.renderRadioButtonContainer()}
      </>
    )
  }
}
export default FilterGroup
