/* eslint no-shadow: "off" */
/* eslint no-param-reassign: "off" */
import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies

import {
  READER_ADD_FOLLOW_USER,
  READER_SET_FOLLOW_USER_LIST,
  READER_REMOVE_FOLLOW_USER,
  READER_ADD_UNFOLLOW_USER,
  READER_SET_UNFOLLOW_USER_LIST,
  READER_REMOVE_UNFOLLOW_USER,
  READER_UPDATE_USER_ARTICLES,
  READER_REMOVE_USER_ARTICLES,
  READER_SET_BOOKMARK,
  READER_ADD_BOOKMARK,
  READER_REMOVE_BOOKMARK,
} from '../mutation-types';
import * as getters from './getters/reader';
import * as actions from './actions/reader';

const state = () => ({
  followedUsers: [],
  unfollowedUsers: [],
  articles: {},
  bookmarks: {},
});

const mutations = {
  [READER_ADD_FOLLOW_USER](state, user) {
    state.followedUsers.push(user);
  },
  [READER_SET_FOLLOW_USER_LIST](state, users) {
    state.followedUsers = users;
  },
  [READER_REMOVE_FOLLOW_USER](state, user) {
    state.followedUsers = state.followedUsers.users.filter(u => u !== user);
  },
  [READER_ADD_UNFOLLOW_USER](state, user) {
    state.unfollowedUsers.push(user);
  },
  [READER_SET_UNFOLLOW_USER_LIST](state, users) {
    state.unfollowedUsers = users;
  },
  [READER_REMOVE_UNFOLLOW_USER](state, user) {
    state.unfollowedUsers = state.unfollowedUsers.filter(u => u !== user);
  },
  [READER_UPDATE_USER_ARTICLES](state, { user, list }) {
    Vue.set(state.articles, user, list);
  },
  [READER_REMOVE_USER_ARTICLES](state, user) {
    Vue.delete(state.articles, user);
  },
  [READER_SET_BOOKMARK](state, bookmarks) {
    state.bookmarks = bookmarks.reduce((acc, b) => {
      acc[b] = true;
      return acc;
    }, {});
  },
  [READER_ADD_BOOKMARK](state, bookmark) {
    Vue.set(state.bookmarks, bookmark, true);
  },
  [READER_REMOVE_BOOKMARK](state, bookmark) {
    Vue.delete(state.bookmarks, bookmark);
  },
};

export default {
  actions,
  getters,
  state,
  mutations,
};
