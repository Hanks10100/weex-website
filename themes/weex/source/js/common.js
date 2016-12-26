;(function () {
  var BODY = document.body
  /**
   * Toggling sidebar
   */

  function initSidebar () {
    var sidebarEl = document.querySelector('#sidebar')
    var menuBtn = document.querySelector('#header .btn-menu')
    var closeBtn = sidebarEl.querySelector('.btn-close-sidebar')
    var sidebarMenu = sidebarEl.querySelector('.sidebar-menu')

    menuBtn.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      
      sidebarEl.classList.toggle('open')
    })

    BODY.addEventListener('click', function (e) {
      var target = e.target

      if (sidebarEl.classList.contains('open')) {
        if (target === closeBtn || !sidebarMenu.contains(target)) {
          sidebarEl.classList.remove('open')
        }
      }
    })
  }

  initSidebar()

  /*
   * LANDINGPAGE 
   */
  if (PAGE_TYPE === 'index') {
    /**
     * Index page animation
     */
    function AppearController(el, opts) {
      
      this._lastScroll = window.pageYOffset
      this._ticking = false
      this.el = el
      this.offsetTop = el.offsetTop
      this.offsetHeight = el.offsetHeight
      this._optsCBK = opts.callback || {}
      this._optsThreshold = opts.threshold || -10
      this._handler = this._requestScroll.bind(this)
      this._create()
    }

    AppearController.prototype._requestScroll = function() {
      var currentScroll = window.pageYOffset

      // if (currentScroll > this._lastScroll) {
        this._lastScroll = window.pageYOffset
        this._requestTick()
      // }
    }

    AppearController.prototype._create = function() {
      if (this._inViewport()) {
        this.update(this)
      } else {
        window.addEventListener('scroll', this._handler, false)
        window.addEventListener('resize', this._handler, false)
      }
    }

    AppearController.prototype._destroy = function() {
      window.removeEventListener('scroll', this._handler, false)
      window.removeEventListener('resize', this._handler, false)
    }

    AppearController.prototype._requestTick = function() {

      if(!this._ticking) {
        requestAnimationFrame(this.update.bind(this))

        this._ticking = true
      }
    }

    AppearController.prototype._inViewport = function() {
      var viewportTop = this._lastScroll
      var viewportBottom = viewportTop + window.innerHeight
      var threshold = (this._optsThreshold / 100) * window.innerHeight
      var bottomEdge = viewportBottom + threshold 
      var topEdge = viewportTop - this.offsetHeight - threshold

      return this.offsetTop <= bottomEdge && this.offsetTop >= topEdge
    }


    AppearController.prototype.update = function() {

      if(this._inViewport()) {
        this._ticking = false

        this._optsCBK && this._optsCBK(this.el, this.offsetTop)
        this._destroy()
      } else {
        this._ticking = false
      }
    }

    function initLayerAnim () {
      var featureEl = document.querySelector('.feature')
      var img_level_2 = featureEl.querySelector('.level2')
      var img_level_3 = featureEl.querySelector('.level3')
      var img_level_4 = featureEl.querySelector('.level4')

      var scroll = new AppearController(featureEl, {
        threshold: -30,
        callback: function (el, offset) {

          var layerSequence = [
            { e: img_level_4, p: { translateX: '5px', translateY: '-95px' }, o: { easing: 'ease-out', duration: 900 } },
            { e: img_level_3, p: { translateX: '5px', translateY: '-65px' }, o: { easing: 'ease-out', duration: 700, sequenceQueue: false } },
            { e: img_level_2, p: { translateX: '5px', translateY: '-35px' }, o: { easing: 'ease-out', duration: 500, sequenceQueue: false  } }
          ]

          Velocity.RunSequence(layerSequence)
        }
      })

      var featureEl = document.querySelector('.supporting-vue')
      var scroll = new AppearController(featureEl, {
        threshold: -30,
        callback: function (el, offset) {
        }
      })
    }

    initLayerAnim()
  } else {}

function initSearch() {
  var form = document.getElementById('search-form')
  var input = form.querySelector('#search-input')
  var panel = document.querySelector('.results-panel')

  BODY.addEventListener('click', function (e) {
    var target = e.target

      if (!panel.contains(target)) {
        panel.classList.remove('show')
      }
  })

  reqwest({
    url: '/weex-website/content.json', 
    type: 'json'
  })
  .then(function (resp) {
    var root = resp.meta.root || '/weex-website/'

    input.addEventListener('input', function (e) {
      var target = e.target,
          keywords = target.value.trim().split(/[\s\-\，\\/]+/)

      if (target.value.trim() !== '') {
        var matchingPosts = searchFromJSON(resp.pages, keywords)
        var html = ''

        matchingPosts.forEach(function (post, index) {
          var url = root + post.url
          var htmlSnippet = '<div class=\"matching-post\">' +
                              '<h2>' +
                                '<a href=\"' + url + '\">' + post.title + '</a>' +
                              '</h2>' +
                              '<p>' + post.content + '</p>' +
                            '</div>'
          
          html += htmlSnippet
        })
        
        panel.classList.add('show')
        panel.innerHTML = html ? html : '<p>No Results!</p>'
      } else {
        panel.classList.remove('show')
        panel.innerHTML = ''
      }
    })
  })
}

function searchFromJSON (data, keywords) {
  var matchingResults = []

  for (var i = 0; i < data.length; i++) {
    // if (i > 7) break; 

    var post = data[i]
    var isMatch = false
    var postTitle = post.title && post.title.trim(),
        postContent = post.text && post.text.trim(),
        postUrl = post.path || '',
        postType = post.type
    var matchingNum = 0
    var resultStr = ''

    if(postTitle !== '' && postContent !== '') {
      keywords.forEach(function(keyword, i) {
        var regEx = new RegExp(keyword, "gi")
        var indexTitle = -1,
            indexContent = -1,
            indexTitle = postTitle.search(regEx),
            indexContent = postContent.search(regEx)

        if(indexTitle < 0 && indexContent < 0){
          isMatch = false;
        } else {
          isMatch = true
          matchingNum++
          if (indexContent < 0) {
            indexContent = 0;
          }
          
          var start = 0,
              end = 0
          
          start = indexContent < 11 ? 0 : indexContent - 10
          end = start === 0 ? 70 : indexContent + keyword.length + 60
          if (end > postContent.length) {
            end = postContent.length
          }

          var matchContent = '...' + postContent.substring(start, end).replace(regEx, "<em class=\"search-keyword\">"+keyword+"</em>") + '...'
          resultStr += matchContent
        }
      })

      if (isMatch) {
        var matchingPost = {
          title: escapeHtml(postTitle),
          content: resultStr,
          url: postUrl,
          type: postType,
          matchingNum: matchingNum
        }

        matchingResults.push(matchingPost)
      }
    }
  }
  // matchingResults.sort(function (a, b) {
  //   return a.matchingNum > b.matchingNum
  // })

  return matchingResults
}

function escapeHtml(string) {
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  }

  return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
  })
}

initSearch()
})();