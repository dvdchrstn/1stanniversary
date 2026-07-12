export function initCanvas() {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');
  const cursorGlow = document.querySelector('.cursor-glow');
  
  let particles = [];
  let particlePool = [];
  let mouseX = 0;
  let mouseY = 0;
  let currentWeather = 'glow';
  let animationFrameId;
  let isTabActive = true;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isTabActive = false;
      stopAnimation();
      if (cursorGlow) cursorGlow.style.opacity = '0';
    } else {
      isTabActive = true;
      startAnimation();
      if (cursorGlow) cursorGlow.style.opacity = '1';
    }
  });
  
  // Cursor tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorGlow) {
      cursorGlow.style.transform = `translate(${mouseX - 150}px, ${mouseY - 150}px)`;
    }
  });
  
  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.type = 'glow';
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = 0;
      this.speedY = 0;
      this.speedX = 0;
      this.opacity = 0;
      this.color = 'rgba(0,0,0,0)';
      this.rotation = 0;
      this.rotationSpeed = 0;
      this.active = false;
    }

    init(type) {
      this.active = true;
      this.type = type;
      this.x = Math.random() * canvas.width;
      this.y = type === 'confetti' ? -20 : Math.random() * canvas.height;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = this.getColor();
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2;
    }
    
    getColor() {
      switch(this.type) {
        case 'hearts': return `rgba(236, 72, 153, ${this.opacity})`;
        case 'petals': return `rgba(251, 207, 232, ${this.opacity})`;
        case 'stars': return `rgba(250, 204, 21, ${this.opacity})`;
        case 'bokeh': return `rgba(46, 196, 182, ${this.opacity})`;
        case 'confetti': {
          const colors = ['#2ec4b6', '#d8b46a', '#ff6b9d', '#a78bfa'];
          return colors[Math.floor(Math.random() * colors.length)];
        }
        default: return `rgba(46, 196, 182, ${this.opacity})`;
      }
    }
    
    update() {
      if (!this.active) return;

      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      
      if (this.y > canvas.height + 20) {
        this.recycle();
      }
      
      if (this.x > canvas.width + 20 || this.x < -20) {
        this.recycle();
      }
    }

    recycle() {
      this.reset();
      particlePool.push(this);
    }
    
    draw() {
      if (!this.active) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      
      switch(this.type) {
        case 'hearts':
          ctx.fillStyle = this.color;
          ctx.font = `${this.size}px Arial`;
          ctx.fillText('♥', -this.size/2, this.size/2);
          break;
        case 'petals':
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'stars':
          ctx.fillStyle = this.color;
          ctx.font = `${this.size}px Arial`;
          ctx.fillText('✨', -this.size/2, this.size/2);
          break;
        case 'bokeh':
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'confetti':
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size/2, -this.size*2, this.size, this.size * 4);
          break;
        default:
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
      }
      
      ctx.restore();
    }
  }
  
  function createParticles(type, count = 30) {
    // Return existing particles to the pool
    particles.forEach(p => p.recycle());
    particles = [];

    let needed = count;
    for (let i = 0; i < needed; i++) {
      let p = particlePool.pop();
      if (p) {
        p.init(type);
      } else {
        p = new Particle();
        p.init(type);
      }
      particles.push(p);
    }
  }
  
  function animate() {
    if (!isTabActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.active);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    if (particles.length < 20) {
      let p = particlePool.pop();
      if (p) {
        p.init(currentWeather);
        particles.push(p);
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }
  
  function startAnimation() {
    if (!animationFrameId) {
      animate();
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
  
  // Initialize with default weather
  createParticles('glow', 20);
  startAnimation();
  
  // Listen for weather changes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const weather = entry.target.dataset.weather;
        if (weather && weather !== currentWeather) {
          currentWeather = weather;
          updateWeather(weather);
        }
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-weather]').forEach(el => {
    observer.observe(el);
  });
  
  function updateWeather(weather) {
    let count = 30;
    
    switch(weather) {
      case 'hearts': count = 25; break;
      case 'petals': count = 40; break;
      case 'stars': count = 30; break;
      case 'bokeh': count = 20; break;
      case 'confetti': count = 50; break;
      default: count = 20;
    }
    
    createParticles(weather, count);
  }
  
  // Expose weather update globally
  window.updateWeather = updateWeather;
  window.startCanvasAnimation = startAnimation;
  window.stopCanvasAnimation = stopAnimation;
}
