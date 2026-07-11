export function initCanvas() {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');
  const cursorGlow = document.querySelector('.cursor-glow');
  
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;
  let currentWeather = 'glow';
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
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
    constructor(type) {
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
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      
      if (this.y > canvas.height + 20) {
        this.y = -20;
        this.x = Math.random() * canvas.width;
      }
      
      if (this.x > canvas.width + 20) {
        this.x = -20;
      } else if (this.x < -20) {
        this.x = canvas.width + 20;
      }
    }
    
    draw() {
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
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(type));
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Initialize with default weather
  createParticles('glow', 20);
  animate();
  
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
}
