import * as constants from '../constants/reports';
import moment from 'moment';

const initialState = {
  userId: null,
  isUserChecked: null,
  startDate: null,
  endDate: null,
  minStartDate: null,
  minEndDate: null,
  availableActivities: [],
  activityType: 'all',

  calendarReports: null,
  dailyReports: null,
  weeklyReports: null,
  monthlyReports: null,

  dailyEnergyRecords: null,
  weeklyEnergyRecords: null,
  monthlyEnergyRecords: null,
  energyUnit: null,

  activitiesCount: null,
  durationStats: null,
  sessionTimes: null,

  isLoading: {
    checkUser: null,
    findUserReports: null,
  },


  // ToDo remove for production
  allReports: null,
};

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CHECK_USER_INIT:
      return {
        ...state,
        // userId: null,
        isUserChecked: null,
        calendarReports: null,
        sessionTimes: null,
        dailyReports: null,
        weeklyReports: null,
        monthlyReports: null,
        dailyEnergyRecords: null,
        weeklyEnergyRecords: null,
        monthlyEnergyRecords: null,
        activitiesCount: null,
        durationStats: null,
        energyUnit: null,
        isLoading: { ...state.isLoading, checkUser: true }
      };
    case constants.CHECK_USER_FAILURE:
      return { ...state, userId: null, isUserChecked: null, isLoading: { ...state.isLoading, checkUser: false } };
    case constants.CHECK_USER_SUCCESS:
      let startDate = moment(action.payload.startDate);
      const endDate = moment(action.payload.endDate);

      if (endDate.diff(startDate, 'months') > 12) {
        startDate = moment(endDate).subtract(12, 'months');
      }

      return {
        ...state,
        startDate,
        endDate,
        userId: action.payload.userId,
        availableActivities: action.payload.activities,
        minStartDate: startDate,
        minEndDate: endDate,
        isUserChecked: true,
        isLoading: { ...state.isLoading, checkUser: false },
      };
    case constants.EXIT_USER:
      return {
        ...state,
        userId: null,
        isUserChecked: null,
        calendarReports: null,
        sessionTimes: null,
        dailyReports: null,
        weeklyReports: null,
        monthlyReports: null,
        dailyEnergyRecords: null,
        weeklyEnergyRecords: null,
        monthlyEnergyRecords: null,
        activitiesCount: null,
        durationStats: null,
        energyUnit: null,
      };


    case constants.FIND_REPORTS_INIT:
      return {
        ...state,
        calendarReports: null,
        sessionTimes: null,
        dailyReports: null,
        weeklyReports: null,
        monthlyReports: null,
        activitiesCount: null,
        durationStats: null,
        energyUnit: null,
        isLoading: { ...state.isLoading, findUserReports: true }
      };
    case constants.FIND_REPORTS_FAILURE:
      return { ...state , isLoading: { ...state.isLoading, findUserReports: false }};
    case constants.FIND_REPORTS_SUCCESS:
      return {
        ...state,
        calendarReports: action.payload.calendarRecords,
        dailyReports: action.payload.dailyRecords,
        weeklyReports: action.payload.weeklyRecords,
        monthlyReports: action.payload.monthlyRecords,
        dailyEnergyRecords: action.payload.dailyEnergyRecords,
        weeklyEnergyRecords: action.payload.weeklyEnergyRecords,
        monthlyEnergyRecords: action.payload.monthlyEnergyRecords,
        activitiesCount: action.payload.activitiesCount,
        durationStats: action.payload.durationStats,
        sessionTimes: action.payload.sessionTimes,
        energyUnit: action.payload.energyUnit,
        isLoading: { ...state.isLoading, findUserReports: false }
      };

    case constants.CHANGE_REPORTS_SEARCH_CRITERIA:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        activityType: action.payload.activityType || 'all',
      };

    case constants.REMOVE_USER_INIT:
      return {
        ...state,
        isLoading: { ...state.isLoading, removeUser: true }
      };
    case constants.REMOVE_USER_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, removeUser: false }
      };
    case constants.REMOVE_USER_FAILURE:
      return {
        ...state,
        isLoading: { ...state.isLoading, removeUser: false }
      };

    // ToDo remove for production
    case 'GET_ALL_HEALTH_DATA':
      return {
        ...state,
        allReports: action.payload,
      };

    default:
      return state;
  }
};
