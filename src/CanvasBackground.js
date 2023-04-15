import React, { Component } from 'react';

class CanvasBackground extends Component {
  componentDidMount() {
    this.canvas = document.getElementById('canvas-background');
    this.ctx = this.canvas.getContext('2d');

    

    // Set canvas size to match window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Initialize animation loop
    this.lastTime = 0;
    this.texts = [];

    requestAnimationFrame(this.loop.bind(this));
  }

  componentWillUnmount() {
    // Stop animation loop to avoid memory leaks
    cancelAnimationFrame(this.animationFrameId);
  }

  loop(time) {
    // Calculate time since last frame
    
    this.lastTime = time;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Add new text element to array
    if (Math.random() < 0.05) {
      this.texts.push({
        x: Math.random() * this.canvas.width,
        y: 0,
        dy: Math.random() * 3 + 1,
        text: Math.random() < 0.5 ? '0' : '1',
        fontSize: Math.random() * 12 + 10,
        color: 'rgba(0, 255, 0, 1)',
      });
    }

    // Update and draw each text element
    this.texts.forEach((text, i) => {
      text.y += text.dy;

      if (text.y > this.canvas.height) {
        this.texts.splice(i, 1);
      } else {
        this.ctx.font = `${text.fontSize}px Retro Font3`;
        this.ctx.fillStyle = text.color;
        this.ctx.fillText(text.text, text.x, text.y);
      }
    });

    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    return (
      <canvas
        id="canvas-background"
        className="canvas-background"
        style={{ backgroundColor : 'black'}}
      />
    );
  }
}

export default CanvasBackground;
