const tokens = {
  admin: {
    token: 'eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzV29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwidXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTU2NzY1MDEyNH0.OzrqO7lgGXd6fFoXLbrceBOjVOIQat0nDRF2M2-pr60'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzV29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwidXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTU2NzY1MDEyNH0.OzrqO7lgGXd6fFoXLbrceBOjVOIQat0nDRF2M2-pr60': {
    menuCodes: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    btns: {
      '1': '新增',
      '2': '删除',
      '3': '查看',
      '4': '修改'
    },
    name: '管理员',
    introduction: '管理员'
  },
  'editor-token': {
    menuCodes: ['editor'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    btns: {
      '3': '查看',
      '4': '修改'
    },
    name: '普通用户',
    introduction: '普通用户'
  }
}

export default [
  // user login
  {
    url: '/u/user/login',
    type: 'post',
    response: config => {
      return {
        code: 200,
        message: '成功!',
        data: { token: 'xxxx' }
      }
    }
  },

  // get user info
  {
    url: '/u/user/info\.*',
    type: 'post',
    response: config => {
      const info = {
        menuCodes: ['editor'],
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        btns: {
          '3': '查看',
          '4': '修改'
        },
        name: '普通用户',
        introduction: '普通用户'
      }
      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/sys/u/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
