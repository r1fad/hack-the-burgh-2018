export const RECEIVE_USERINFO = 'RECEIVE_USERINFO';
export const RECEIVE_USERDATA = 'RECEIVE_USERDATA';

function getUserData(json){
  const { userInfo } = json;
  return {
    type: RECEIVE_USERINFO,
    userInfo
  }
}

function fetchUserDataJson(){
  return fetch('http://127.0.0.1:5000/userinfo',{
    method: 'get',
    mode: 'cors'
  })
  .then(response => response.json())
}

export function fetchUserData(){
  return function(dispatch){
    return fetchUserDataJson()
      .then(json => dispatch(getUserData(json)))
  }
}
