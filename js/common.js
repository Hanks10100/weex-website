;(function () {
  initSidebar()

  /**
   * Toggling sidebar
   */
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

    document.body.addEventListener('click', function (e) {
      var target = e.target

      if (sidebarEl.classList.contains('open')) {
        if (target === closeBtn || !sidebarMenu.contains(target)) {
          sidebar.hide()
        }
      }
    })
  }

  function Sidebar (el) {
    var sidebar = el
    var bg = sidebar.querySelector('.sidebar-backdrop')
    var menu = sidebar.querySelector('.sidebar-menu')

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

      document.body.style.overflow = 'hidden'
      document.body.addEventListener('touchmove', scrollHandler)
    }

    var hide = function () {

      var hideSequence = [
        { e: bg, p: 'fadeOut', o: { easing: 'ease-in', duration: 300 } },
        { e: menu, p: 'transition.slideRightOut', o: { easing: 'ease-in', duration: 300 , sequenceQueue: false } },
        { e: sidebar, p: { opacity: 0 }, o: { display: 'none', duration: 0 } }
      ]

      Velocity.RunSequence(hideSequence)
      sidebar.classList.remove('open')

      document.body.style.overflow = 'auto'
      document.body.removeEventListener('touchmove', scrollHandler)
    }

    return {
      show: show,
      hide: hide
    }
  }

})();