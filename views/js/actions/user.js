// Imports
import jwtDecode from 'jwt-decode'


export const USER_CURRENT_SET = 'USER_CURRENT_SET'


export function setCurrentUser (user) {
  return {
    type: USER_CURRENT_SET,
    user
  }
}

export function userLogout () {
  return dispatch => {
    localStorage.removeItem('token')

    dispatch(setCurrentUser({}))

    return {success: true}
  }
}
