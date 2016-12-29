// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

;(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o']
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                || window[vendors[x]+'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function() { callback(currTime + timeToCall) }, 
        timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id)
    }
}());

function Galaxy(canvas, orbitColor) {
  var ctx = canvas.getContext("2d")

  this.ctx = ctx
  this.offset = Math.random() * 360
  this.width = canvas.width
  this.height = canvas.height
  this.orbitColor = orbitColor
  this.radius = this.width / 2
  this.x = this.width / 2
  this.y = this.height / 2
  this.orbits = []

  this.bigBang()
}

Galaxy.prototype.bigBang = function () {
  var ctx = this.ctx,
      that = this

  for (var i = 1; i <= 10; i++) {
    var color = 'rgba(' + hexToRgb(this.orbitColor) + ',' + i/10 + ')',
        orbit = new Orbit(that.x, that.y, that.radius - i*20, color)

    that.orbits.push(orbit)
    
    if (i < 6) {
      for (var j = 0; j < 3; j++) {
        var size = j === 1 
                  ? Math.floor(Math.random() * 10 + 10) 
                  : Math.floor(Math.random() * 6 + 3),
            velocity = 0.01-0.00025*size,
            planet = new Planet(size, '#fff', velocity)

        orbit.addPlanet(planet)
      }
    }
  }
}

Galaxy.prototype.spin = function () {
  var that = this,
      ctx = this.ctx

  ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  this.orbits.forEach(function (orbit, index) {
    orbit.draw(ctx)
    orbit.planets.forEach(function (planet) {
      planet.draw.call(planet, ctx)
    })
  })
  ctx.restore()

  that.spinAnim = window.requestAnimationFrame(that.spin.bind(that))
}

Galaxy.prototype.stop = function () {
  var that = this,
      ctx = this.ctx

  window.cancelAnimationFrame(that.spinAnim)
}

function Orbit (x, y, radius, color) {
  this.planets = []
  this.radius = radius
  this.color = color
	this.x = x
	this.y = y
}

Orbit.prototype.draw = function (ctx) {
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.lineWidth = '2'
  ctx.strokeStyle = this.color
  ctx.stroke()
}

Orbit.prototype.addPlanet = function (planet) {
  this.planets.push(planet)
  planet.orbit = this
}

function Planet (size, color, velocity) {
  this.size = size
  this.color = color
  this.velocity = velocity
  this.offset = Math.random() * 360
}

Planet.prototype.draw = function (ctx) {
  this.x = this.orbit.x + this.orbit.radius * Math.cos(this.offset)
	this.y = this.orbit.y + this.orbit.radius * Math.sin(this.offset)

  ctx.beginPath()
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fillStyle = this.color
  ctx.fill()
  ctx.strokeStyle = this.color
  ctx.stroke()

  this.offset += this.velocity
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b].join(',')
}