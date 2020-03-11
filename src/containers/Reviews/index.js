import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Rating } from 'material-ui-rating'

import CircularProgress from 'material-ui/CircularProgress';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Quote from 'material-ui/svg-icons/editor/format-quote';
import SelectField from 'material-ui/SelectField';
import Stars from 'material-ui/svg-icons/action/stars';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import muiThemeable from 'material-ui/styles/muiThemeable';
import * as reviewsActions from '../../actions/reviews';
import { GENDERS } from '../../constants/constants';
import PageHeader from '../../components/PageTitle';
import moment from 'moment';
import isEmptry from 'lodash/isEmpty';
import './reviews.css';

const REVIEWS_PER_PAGE_VALUES = [ 5, 10, 25, 50 ];

class Reviews extends Component {
  state = {
    errors: {
      review: 'Please provide an opinion',
      rating: 'Please rate us',
    },
    isRatingFormExpanded: false,
    isSubmitted: false,
    gender: GENDERS.MAN,
    firstName: '',
    review: '',
    rating: null,
  };

  componentDidMount() {
    const { pageNumber, pageSize } = this.props;

    this.getReviews({ pageNumber, pageSize });
  }

  getReviews = (params) => {
    const { getReviews } = this.props;

    getReviews(params);
  };

  getErrors = (values) => {
    const errors = {};
    const { firstName, rating, review } = values;

    if (!(firstName && firstName.length)) {
      errors.firstName = 'Please tell us who you are';
    }
    else if (firstName.length < 3) {
      errors.firstName = 'Provide a longer name';
    }
    else if (firstName.length > 90) {
      errors.firstName = 'Provide a shorter name';
    }

    if (!(review && review.length)) {
      errors.review = 'Please provide an opinion';
    }
    else if (review.length < 3) {
      errors.review = 'Please provide a longer message';
    }
    else if (review.length > 2048) {
      errors.review = 'Please provide a shorter message';
    }


    if (!rating) {
      errors.rating = 'Please rate us';
    }

    return errors;
  };

  changeState = (property, value) => this.setState((prevState) => ({
    ...prevState,
    [property]: value,
    errors: this.getErrors({ ...prevState, [property]: value }),
  }));

  reset = () => this.setState({
    isRatingFormExpanded: false,
    review: '',
    rating: null,
  });

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSubmitted: true }, () => this.saveReview());
  };

  saveReview = async () => {
    const { firstName, gender, rating, review, errors } = this.state;

    if (isEmptry(errors)) {
      this.props.saveReviews({ firstName, gender, rating, review })
        .then(() => this.setState({
          isRatingFormExpanded: false,
          isSubmitted: false,
          gender: GENDERS.MAN,
          firstName: '',
          review: '',
          rating: null,
        }));
    }
  };

  render() {
    const {
      userId,
      pageNumber,
      pageSize,
      totalItems,
      reviewInfoList,
      muiTheme: { palette }
    } = this.props;
    const {
      errors,
      firstName,
      isSubmitted,
      isRatingFormExpanded,
      review,
      rating,
    } = this.state;

    const avatarSize = 48;

    const reviews = reviewInfoList ? reviewInfoList.map((review, index) => {
      const colorIndex = Math.floor(index % 7) + 1;
      const color = `primary${colorIndex}Color`;
      const rating = [];

      for (let i = 1; i <= review.rating; i++) {
        rating.push(i);
      }

      return (
        <div key={index}>
          <Paper>
            <div className="flex padding">
              <Avatar
                backgroundColor={palette[color]}
                color={'#FFFFFF'}
                style={{
                  minWidth: avatarSize,
                  height: avatarSize,
                  width: avatarSize,
                  fontSize: 26,
                  fontWeight: 300,
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
                }}
              >
                { review.firstName.substr(0,1).toUpperCase() }
              </Avatar>
              &nbsp;&nbsp;
              <div style={{ textAlign: 'left' }}>
                <div className="flex">
                  { rating.map((rating) => <Star key={rating} style={{ color: palette.primary }}/>) }
                </div>
                <div className="flex">
                  <div className="quote"><Quote/></div>&nbsp;<p>{ review.review }</p>&nbsp;<div className="quote"><Quote/></div>
                </div>
                <p className="author">By { review.firstName } on { moment(review.createdAt).format('DD-MM-YYYY') }</p>
              </div>
            </div>
          </Paper>
          <br />
        </div>
      )
    }) : null;

    return (
      <div className="page-reviews padding">
        <PageHeader title={'Feedback'}/>

        {
          reviewInfoList ?
            <Grid>
              {
                !!userId ?
                  <Row center="xs" middle="xs">
                    <Col xs={12} sm={10} md={8} lg={7}>
                      <Paper zDepth={2} className="reviews-form-container">
                        <div className="reviews-form-header">
                          <Paper className="form-suggestion" style={{ backgroundColor: palette.primary1Color }}>
                            <Stars />
                          </Paper>

                          <h2>Your review</h2>
                        </div>

                        <form className="reviews-form" onSubmit={this.onSubmit}>
                          {
                            isRatingFormExpanded ?
                              <TextField
                                fullWidth={true}
                                hintText="Your name"
                                value={firstName}
                                onChange={(evt) => this.changeState('firstName', evt.target.value)}
                                errorText={ isSubmitted && errors.firstName }
                              /> : null
                          }

                          <TextField
                            fullWidth={true}
                            hintText="Your review"
                            multiLine={true}
                            rows={1}
                            rowsMax={6}
                            value={review}
                            onChange={(evt) => this.changeState('review', evt.target.value)}
                            onFocus={() => this.changeState('isRatingFormExpanded', true)}
                            errorText={isSubmitted && errors.review}
                          />

                          {
                            isRatingFormExpanded ?
                              <div>
                                <br />

                                <div className="rating-container">
                                  <div className="flex wrap-content align-center">
                                    <div>
                                      <Rating
                                        value={rating}
                                        max={5}
                                        onChange={(value) => this.changeState('rating', value)}
                                        iconFilled={<Star color={palette.primary1Color}/>}
                                        iconHovered={<Star color={palette.primary1Color}/>}
                                        iconNormal={<StarBorder color={'rgba(0,0,0,0.54)'}/>}
                                      />

                                      {
                                        isSubmitted && errors.rating ?
                                          <span style={{
                                            position: 'relative',
                                            bottom: 8,
                                            fontSize: 12,
                                            marginLeft: 12,
                                            color: 'rgb(244, 67, 54)',
                                            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                                          }}>
                              {errors.rating}
                            </span> : null
                                      }
                                    </div>

                                    <span style={{flex: 1}}></span>
                                    <FlatButton label="Cancel" type="button"  onClick={this.reset} primary/>

                                    <RaisedButton label="Submit" type="submit" primary/>
                                  </div>
                                </div>
                              </div> : null
                          }
                        </form>
                      </Paper>
                    </Col>
                  </Row> : null
              }

              <br /> <br />
              <br />

              <Row center="xs" middle="xs">
                <Col xs={12} sm={12} md={11} lg={9}>
                  { reviews }
                </Col>
              </Row>

              <Row center="xs" middle="xs">
                <Col xs={12} sm={12} md={11} lg={9}>
                  <div className="flex pagination">
                    <span style={{ flex: 1 }}></span>
                    <p>Reviews per page</p>
                    <SelectField
                      className="pagination-select"
                      autoWidth={true}
                      value={pageSize}
                      iconStyle={{ fill: 'rgba(0,0,0,0.57) !important' }}
                      onChange={(event, index, value) =>  this.getReviews({ pageNumber, pageSize: value })}
                    >
                      { REVIEWS_PER_PAGE_VALUES.map((value) => (<MenuItem key={value} value={value} primaryText={value} />)) }
                    </SelectField>

                    <p>{ pageNumber * pageSize + 1 } - { Math.min((pageNumber + 1) * pageSize , totalItems)} of { totalItems }</p>

                    <IconButton
                      disabled={pageNumber === 0}
                      onClick={() => this.getReviews({ pageNumber: pageNumber - 1, pageSize })}
                    >
                      <Left/>
                    </IconButton>

                    <IconButton
                      disabled={(pageNumber + 1) * pageSize > totalItems}
                      onClick={() =>this.getReviews({ pageNumber: pageNumber + 1, pageSize })}
                    >
                      <Right/>
                    </IconButton>
                  </div>
                </Col>
              </Row>
            </Grid> :
            <div className="flex justify-center">
              <CircularProgress/>
            </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.reports.userId,
  pageNumber: state.reviews.pageNumber,
  pageSize: state.reviews.pageSize,
  totalItems: state.reviews.totalItems,
  reviewInfoList: state.reviews.reviewInfoList,
  isLoading: state.reviews.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews: (params) => dispatch(reviewsActions.getReviews(params)),
  saveReviews: (data) => dispatch(reviewsActions.saveReviews(data)),
});

Reviews.propTypes = {
  pageNumber: Proptypes.number,
  pageSize: Proptypes.number,
  totalItems: Proptypes.number,
  reviewInfoList: Proptypes.array,
  isLoading: Proptypes.object,
  getReviews: Proptypes.func,
  saveReviews: Proptypes.func,
};

const withTheme = muiThemeable()(Reviews);

export default connect(mapStateToProps, mapDispatchToProps)(withTheme);

