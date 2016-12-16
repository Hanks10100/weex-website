;(function () {
  var BODY = document.body
  /**
   * Toggling sidebar
   */
  function Sidebar (el) {
    var sidebar = el
    var bg = sidebar.querySelector('.sidebar-backdrop')
    var menu = sidebar.querySelector('.sidebar-menu')
    var scrollbarWidth = getScrollerWidth()

    function scrollHandler(e) {
      e.preventDefault()
      e.stopPropagation()

      return false
    }

    var show = function () {

      var showSequence = [
        { e: sidebar, p: {opacity: 1}, o: { display: 'block', duration: 0 } },
        { e: bg, p: 'fadeIn', o: { easing: 'ease-in', duration: 300, sequenceQueue: false  } },
        { e: menu, p: 'transition.slideRightIn', o: { easing: 'ease-in', duration: 300, sequenceQueue: false } }
      ]

      Velocity.RunSequence(showSequence)
      sidebar.classList.add('open')

      BODY.style.overflow = 'hidden'
      BODY.style.paddingRight = scrollbarWidth + 'px'
      BODY.addEventListener('touchmove', scrollHandler)
    }

    var hide = function () {

      var hideSequence = [
        { e: bg, p: 'fadeOut', o: { easing: 'ease-in', duration: 300 } },
        { e: menu, p: 'transition.slideRightOut', o: { easing: 'ease-in', duration: 300 , sequenceQueue: false } },
        { e: sidebar, p: { opacity: 0 }, o: { display: 'none', duration: 0 } }
      ]

      Velocity.RunSequence(hideSequence)
      sidebar.classList.remove('open')

      BODY.style.overflow = 'auto'
      BODY.style.paddingRight = 0
      BODY.removeEventListener('touchmove', scrollHandler)
    }

    function getScrollerWidth() {
      if (BODY.clientWidth >= window.innerWidth) return 0

      var div = document.createElement("div")
      div.classList.add("scrollbar-measure")
      BODY.append(div)
      var width = div.offsetWidth - div.clientWidth
      BODY.removeChild(div)
      return width 
    }

    return {
      show: show,
      hide: hide
    }
  }
  function initSidebar () {
    var sidebarEl = document.querySelector('#sidebar')
    var menuBtn = document.querySelector('#header .btn-menu')
    var closeBtn = sidebarEl.querySelector('.btn-close-sidebar')
    var sidebarMenu = sidebarEl.querySelector('.sidebar-menu')

    var sidebar = Sidebar(sidebarEl)

    menuBtn.addEventListener('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      
      sidebar.show()
    })

    BODY.addEventListener('click', function (e) {
      var target = e.target

      if (sidebarEl.classList.contains('open')) {
        if (target === closeBtn || !sidebarMenu.contains(target)) {
          sidebar.hide()
        }
      }
    })
  }

  initSidebar()

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
        console.log('show')
      }
    })
  }

  initLayerAnim()

})();