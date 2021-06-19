
// let path = route 함수가 정의된 파일 경로 명시

module.exports = {
  server_port: 3000,
  db_uri: 'mongodb://localhost:27017',
  db_name: 'local',

  db_schemas: [{
    file: 'user_schema',
    collectionName: 'Users',
    schemaName: 'UserSchema',
    modelName: 'UserModel',
  }],

  // routes/route_loader.js 와의 연계 [사용 안함 : 사용법 기록용]
  // route_info: [{
  //   file: path,
  //   path: '/process/login',
  //   method: 'login',
  //   type: 'post'
  // }, {
  //   file: path,
  //   path: '/process/adduser',
  //   method: 'addUser',
  //   type: 'post'
  // }, {
  //   file: path,
  //   path: '/process/listuser',
  //   method: 'userList',
  //   type: 'post'
  // }],

};
