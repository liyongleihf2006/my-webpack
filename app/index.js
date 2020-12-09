import './index.css'
/* import * as axios from 'axios'
import header from './header' */
var router = require('ensure-chunk-loader?pattern=./app/modules/*/&page-suffix=html&script-suffix=js!')
console.log(process.env.BASE_API)
var promise = new Promise(function(resolve, reject) {
  resolve('aaa')
})
async function abc() {
  const val = promise
  console.log(val)
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
}
abc()
console.log(Map)
$('#leftMenu').leftMenu({
  datas: [],
  showExpand: true,
  expandFormatter: function(currentData, isLeaf, isActive, isExpand, level, idx, currentDatas, upperData, datas) {
    return $('<span/>', {
      text: function() {
        if (isExpand) {
          return '-'
        }
        return '+'
      }
    })
  },
  formatter: function(currentData, isLeaf, isActive, isExpand, level, idx, currentDatas, upperData, datas) {
    return [$('<span/>', {
      'class': function() {
        var cls = 'leftMenu-item middle'
        if (isActive) {
          cls += ' active'
        }
        if (isExpand) {
          cls += ' isExpand'
        }
        return cls
      }
    }).append(
      (function() {
        var svgns = 'http://www.w3.org/2000/svg'
        var xlink = 'http://www.w3.org/1999/xlink'
        var bullet = document.createElementNS(svgns, 'svg')
        bullet.setAttribute('height', 8)
        bullet.setAttribute('width', 8)
        bullet.setAttribute('class', 'bullet')
        var use = document.createElementNS(svgns, 'use')
        use.setAttributeNS(xlink, 'href', '#bullet.svg')
        bullet.appendChild(use)
        return bullet
      }()),
      $('<span/>', {
        'class': 'leftMenu-text',
        'text': currentData.name
      })
    )]
  },
  onSelected: async function(currentData, isLeaf, isActive, isExpand, level, idx, currentDatas, upperData, datas, deferred) {
    const { page, script } = await router['./app/modules/' + currentData.url]()
    /* {
            //每次都重新请求子页面的写法
            delete require.cache[require.resolve("./modules/" + currentData.url + "/" + currentData.url + ".html")];
            delete require.cache[require.resolve("./modules/" + currentData.url + "/" + currentData.url + ".js")];
            $("#content").html(
                $("<div/>", {
                    "class": "page",
                    "data-page": `${currentData.name}`
                }).html(page())
            );
            script();
        } */

    // 子页面加载后一直缓存的写法
    var $page = $(`[data-page=${currentData.name}]`)
    if (!$page.length) {
      $page = $('<div/>', {
        'class': 'page',
        'data-page': `${currentData.name}`
      })
        .html(page())
        .appendTo('#content')
      script()
    }
    $('.page').addClass('hidden')
    $page.removeClass('hidden')
  },
  rowEvents: {
    'click': function(currentData, isLeaf, isActive, isExpand, level, idx, currentDatas, upperData, datas, event) {
      event.stopPropagation()
      console.log(currentData.id)
      this.leftMenu('selectById', currentData.id)
    }
  }
})
async function getMenuData() {
  try {
    $('#leftMenu').leftMenu('setDatas', [{
      'id': 1,
      'name': 'first',
      'url': 'first'
    }, {
      'id': 2,
      'name': 'second',
      'url': 'second'
    }, {
      'id': 3,
      'name': 'third',
      'url': 'third'
    }])
  } catch (e) {
    console.error(e)
  }
}
getMenuData()
