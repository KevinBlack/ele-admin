import Mock from 'mockjs'

const List = []
const count = 3

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    bookid: '@increment',
    bookbuytime: +Mock.Random.date('T'),
    bookbuyer: '@cname',
    bookborrower: '@cname',
    bookname: '@cparagraph(2)',
    bookvolume: '@integer(0)',
    editing: false
  }))
}

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => List
  },

  {
    url: '/table/detail',
    type: 'post',
    response: config => {
      const { id } = config.query
      for (const table of List) {
        if (table.id === +id) {
          return {
            code: 200,
            data: table
          }
        }
      }
    }
  },

  {
    url: '/table/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/table/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

